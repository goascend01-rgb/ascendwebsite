import { NextResponse } from "next/server";
import {
  FORM_FIELDS,
  isSubmissionKind,
  renderSubmission,
  validate,
} from "@/lib/forms/schema";
import { deliver } from "@/lib/forms/delivery";

/* The single endpoint both forms post to.

   Order of business: cheap rejections first (method, size, bot traps, rate
   limit), then validation, then delivery. The response distinguishes a
   validation problem the visitor can fix from a delivery problem they
   cannot, because telling somebody "check your email address" when the mail
   provider is down wastes their time and loses the lead. */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 32_000;

/* A form is not filled in under two seconds. Scripted submissions are. */
const MIN_FILL_MS = 2_000;

/* Per instance and therefore approximate on serverless, which is fine: this
   is a speed bump against casual abuse, not a security boundary. */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 5_000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const body = await request.text();

  if (body.length > MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, error: "That submission is too large." },
      { status: 413 }
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json(
      { ok: false, error: "That submission could not be read." },
      { status: 400 }
    );
  }

  const kind = payload.kind;
  if (!isSubmissionKind(kind)) {
    return NextResponse.json(
      { ok: false, error: "Unknown form." },
      { status: 400 }
    );
  }

  /* Bot traps. Both fail silently as a success: telling a script which
     check caught it only helps it get past the check next time, and a
     human can never trip either. */
  const honeypot = typeof payload.website === "string" ? payload.website : "";
  const startedAt = Number(payload.startedAt);
  const tooFast =
    Number.isFinite(startedAt) && Date.now() - startedAt < MIN_FILL_MS;

  if (honeypot.length > 0 || tooFast) {
    return NextResponse.json({ ok: true, via: [] satisfies string[] });
  }

  if (rateLimited(clientKey(request))) {
    return NextResponse.json(
      {
        ok: false,
        error: "That is a lot of submissions at once. Try again in a minute.",
      },
      { status: 429 }
    );
  }

  const fields = payload.fields;
  if (typeof fields !== "object" || fields === null) {
    return NextResponse.json(
      { ok: false, error: "That submission could not be read." },
      { status: 400 }
    );
  }

  const result = validate(kind, fields as Record<string, unknown>);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: "Some fields need a second look.", fieldErrors: result.errors },
      { status: 422 }
    );
  }

  const receivedAt = new Date().toISOString();
  const { subject, text } = renderSubmission(kind, result.values, { receivedAt });

  const outcome = await deliver({
    kind,
    subject,
    text,
    values: result.values,
    replyTo: result.values.email,
    receivedAt,
  });

  if (!outcome.ok) {
    /* The submission is about to be lost. Put it in the log so it is
       recoverable, and never tell the visitor it went through. */
    console.error(
      `[forms] delivery ${outcome.reason}: ${outcome.detail}\n${text}`
    );

    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not deliver that. Nothing was sent, so please email us directly and we will pick it up from there.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, via: outcome.via });
}

export async function GET() {
  /* Useful during setup: says whether a backend is wired without revealing
     which credentials are present. */
  const kinds = Object.keys(FORM_FIELDS);
  return NextResponse.json({ ok: true, kinds });
}

/* ==============================================================
   Where a form submission actually goes.

   Two adapters, chosen by which environment variables are set, and
   no new dependency: both are plain fetch calls.

     RESEND_API_KEY + FORM_TO_EMAIL + FORM_FROM_EMAIL
       Email the submission. Resend is a subprocessor and is listed
       as one on /legal/privacy.

     FORM_WEBHOOK_URL
       POST the submission as JSON. Lets the founder point this at
       Zapier, Make, n8n, Slack or a CRM without a code change.

   Both may be set, in which case both run and the submission
   succeeds if either does.

   The rule that matters: this function never reports success unless
   a provider accepted the message. A form that says "sent" when
   nothing was sent is the exact failure this site argues against,
   so an unconfigured or failing backend surfaces as an error the
   visitor can act on.
   ============================================================== */

export type DeliveryOutcome =
  | { ok: true; via: string[] }
  | { ok: false; reason: "unconfigured" | "failed"; detail: string };

export type Submission = {
  kind: string;
  subject: string;
  text: string;
  values: Record<string, string>;
  replyTo?: string;
  receivedAt: string;
};

const TIMEOUT_MS = 10_000;

async function withTimeout(input: string, init: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function deliverByEmail(submission: Submission): Promise<string> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.FORM_TO_EMAIL;
  const from = process.env.FORM_FROM_EMAIL;

  if (!apiKey || !to || !from) throw new Error("email adapter not configured");

  const res = await withTimeout("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: to.split(",").map((address) => address.trim()),
      subject: submission.subject,
      text: submission.text,
      ...(submission.replyTo ? { reply_to: submission.replyTo } : {}),
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`email provider returned ${res.status} ${body.slice(0, 200)}`);
  }

  return "email";
}

async function deliverByWebhook(submission: Submission): Promise<string> {
  const url = process.env.FORM_WEBHOOK_URL;
  if (!url) throw new Error("webhook adapter not configured");

  const res = await withTimeout(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.FORM_WEBHOOK_TOKEN
        ? { Authorization: `Bearer ${process.env.FORM_WEBHOOK_TOKEN}` }
        : {}),
    },
    body: JSON.stringify(submission),
  });

  if (!res.ok) {
    throw new Error(`webhook returned ${res.status}`);
  }

  return "webhook";
}

export function configuredAdapters(): string[] {
  const adapters: string[] = [];
  if (process.env.RESEND_API_KEY && process.env.FORM_TO_EMAIL && process.env.FORM_FROM_EMAIL) {
    adapters.push("email");
  }
  if (process.env.FORM_WEBHOOK_URL) adapters.push("webhook");
  return adapters;
}

export async function deliver(submission: Submission): Promise<DeliveryOutcome> {
  const adapters = configuredAdapters();

  if (adapters.length === 0) {
    return {
      ok: false,
      reason: "unconfigured",
      detail:
        "No delivery adapter is configured. Set RESEND_API_KEY, FORM_TO_EMAIL and FORM_FROM_EMAIL, or FORM_WEBHOOK_URL.",
    };
  }

  const attempts = await Promise.allSettled([
    ...(adapters.includes("email") ? [deliverByEmail(submission)] : []),
    ...(adapters.includes("webhook") ? [deliverByWebhook(submission)] : []),
  ]);

  const delivered = attempts
    .filter((a): a is PromiseFulfilledResult<string> => a.status === "fulfilled")
    .map((a) => a.value);

  const failures = attempts
    .filter((a): a is PromiseRejectedResult => a.status === "rejected")
    .map((a) => (a.reason instanceof Error ? a.reason.message : String(a.reason)));

  if (delivered.length > 0) {
    /* A partial failure still succeeded for the visitor, but somebody needs
       to know a channel is broken. */
    if (failures.length > 0) {
      console.warn("[forms] partial delivery failure:", failures.join(" | "));
    }
    return { ok: true, via: delivered };
  }

  return { ok: false, reason: "failed", detail: failures.join(" | ") };
}

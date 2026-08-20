import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { validate, renderSubmission, sanitiseHeaderValue } from "@/lib/forms/schema";
import { deliver, configuredAdapters } from "@/lib/forms/delivery";
import { findAll, locate, sourceFiles, withoutComments } from "./helpers";

/* The forms used to set a "sent" flag in the browser and speak to nothing.
   These tests hold the replacement to its promise: a submission either
   reaches a configured backend or the visitor is told it did not. */

const ENV_KEYS = [
  "RESEND_API_KEY",
  "FORM_TO_EMAIL",
  "FORM_FROM_EMAIL",
  "FORM_WEBHOOK_URL",
  "FORM_WEBHOOK_TOKEN",
] as const;

let saved: Record<string, string | undefined> = {};

beforeEach(() => {
  saved = Object.fromEntries(ENV_KEYS.map((k) => [k, process.env[k]]));
  for (const key of ENV_KEYS) delete process.env[key];
});

afterEach(() => {
  for (const key of ENV_KEYS) {
    if (saved[key] === undefined) delete process.env[key];
    else process.env[key] = saved[key];
  }
  vi.unstubAllGlobals();
});

describe("validation", () => {
  it("accepts a complete leak report", () => {
    const result = validate("leak-report", {
      name: "  Dana Whitfield  ",
      practice: "Northside",
      email: "dana@example.com",
      message: "We lose a lot of Thursday slots.",
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.values.name).toBe("Dana Whitfield");
      expect(result.values.email).toBe("dana@example.com");
    }
  });

  it("names every missing required field rather than only the first", () => {
    const result = validate("leak-report", {});
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(Object.keys(result.errors).sort()).toEqual([
        "email",
        "name",
        "practice",
      ]);
    }
  });

  it("rejects an address that cannot be one", () => {
    for (const email of ["nope", "a@b", "a b@example.com", "@example.com"]) {
      const result = validate("leak-report", {
        name: "A",
        practice: "B",
        email,
      });
      expect(result.ok, `${email} should be rejected`).toBe(false);
    }
  });

  it("accepts addresses that look unusual but are real", () => {
    for (const email of [
      "first.last+tag@sub.example.co.uk",
      "x@example.io",
      "a_b-c@example-host.com",
    ]) {
      const result = validate("leak-report", { name: "A", practice: "B", email });
      expect(result.ok, `${email} should be accepted`).toBe(true);
    }
  });

  it("rejects an over-long field instead of silently truncating it", () => {
    const result = validate("leak-report", {
      name: "A",
      practice: "B",
      email: "a@example.com",
      message: "x".repeat(4001),
    });
    expect(result.ok).toBe(false);
  });

  it("requires a link to be a link", () => {
    const bad = validate("talent-application", {
      name: "A",
      email: "a@example.com",
      resume: "my-cv.pdf",
    });
    expect(bad.ok).toBe(false);

    const good = validate("talent-application", {
      name: "A",
      email: "a@example.com",
      resume: "https://example.com/cv.pdf",
    });
    expect(good.ok).toBe(true);
  });

  it("strips newlines out of anything that reaches an email header", () => {
    expect(sanitiseHeaderValue("Dana\r\nBcc: someone@else.com")).toBe(
      "Dana Bcc: someone@else.com"
    );
  });

  it("renders only the fields that were filled in", () => {
    const { subject, text } = renderSubmission(
      "leak-report",
      { name: "Dana", practice: "Northside", email: "dana@example.com" },
      { receivedAt: "2026-08-20T00:00:00.000Z" }
    );

    expect(subject).toBe("Leak report request: Dana at Northside");
    expect(text).toContain("Practice name:");
    expect(text).not.toContain("Anything else:");
  });
});

describe("delivery", () => {
  it("reports failure, not success, when nothing is configured", async () => {
    expect(configuredAdapters()).toEqual([]);

    const outcome = await deliver({
      kind: "leak-report",
      subject: "s",
      text: "t",
      values: {},
      receivedAt: "now",
    });

    expect(outcome.ok).toBe(false);
    if (!outcome.ok) expect(outcome.reason).toBe("unconfigured");
  });

  it("succeeds when the webhook accepts it", async () => {
    process.env.FORM_WEBHOOK_URL = "https://hooks.example.com/ascend";
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("ok", { status: 200 }))
    );

    const outcome = await deliver({
      kind: "leak-report",
      subject: "s",
      text: "t",
      values: {},
      receivedAt: "now",
    });

    expect(outcome).toEqual({ ok: true, via: ["webhook"] });
  });

  it("fails when the provider rejects it", async () => {
    process.env.FORM_WEBHOOK_URL = "https://hooks.example.com/ascend";
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("no", { status: 500 }))
    );

    const outcome = await deliver({
      kind: "leak-report",
      subject: "s",
      text: "t",
      values: {},
      receivedAt: "now",
    });

    expect(outcome.ok).toBe(false);
    if (!outcome.ok) expect(outcome.reason).toBe("failed");
  });

  it("still succeeds if one of two channels is down", async () => {
    process.env.RESEND_API_KEY = "test";
    process.env.FORM_TO_EMAIL = "a@example.com";
    process.env.FORM_FROM_EMAIL = "b@example.com";
    process.env.FORM_WEBHOOK_URL = "https://hooks.example.com/ascend";

    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string) =>
        url.includes("resend")
          ? new Response("down", { status: 503 })
          : new Response("ok", { status: 200 })
      )
    );

    const outcome = await deliver({
      kind: "leak-report",
      subject: "s",
      text: "t",
      values: {},
      receivedAt: "now",
    });

    expect(outcome.ok).toBe(true);
    if (outcome.ok) expect(outcome.via).toEqual(["webhook"]);
  });
});

describe("no form may report success on its own", () => {
  it("routes every form through the shared submit hook", () => {
    const forms = sourceFiles("components/forms").filter((f) =>
      /Form\.tsx$/.test(f.rel)
    );

    expect(forms.length).toBeGreaterThan(0);

    for (const form of forms) {
      expect(form.content, `${form.rel} must use useSubmit`).toContain("useSubmit(");
    }
  });

  it("has no form component holding its own sent flag", () => {
    const offenders: string[] = [];

    for (const file of sourceFiles("components/forms")) {
      const scan = withoutComments(file);
      /* The old shape: a local boolean flipped in an onSubmit handler. */
      for (const hit of findAll(scan, /useState\s*(<[^>]*>)?\s*\(\s*false\s*\)/)) {
        const context = scan.content.slice(hit.index - 60, hit.index + 60);
        if (/sent|submitted|success/i.test(context)) {
          offenders.push(locate(file, hit.index));
        }
      }
    }

    expect(
      offenders,
      `A form must not decide it succeeded. Only a 2xx from /api/submissions may:\n${offenders.join(
        "\n"
      )}`
    ).toEqual([]);
  });

  it("only reaches the sent state behind a server acknowledgement", () => {
    const hook = sourceFiles("components/forms").find((f) =>
      f.rel.endsWith("useSubmit.ts")
    );

    expect(hook, "useSubmit.ts must exist").toBeDefined();
    const source = hook!.content;

    /* The type union also mentions "sent", so count assignments only. */
    const assignments = source.match(/setState\(\{\s*status:\s*"sent"/g) ?? [];
    expect(assignments.length, "exactly one path may set sent").toBe(1);

    /* And that one path must sit immediately behind a check on the server
       response, not merely somewhere in the same function. */
    const collapsed = source.replace(/\s+/g, " ");
    expect(
      /if \(res\.ok && payload\?\.ok\) \{ setState\(\{ status: "sent" \}\)/.test(
        collapsed
      ),
      "the sent state must sit directly behind a check on the server response"
    ).toBe(true);
  });
});

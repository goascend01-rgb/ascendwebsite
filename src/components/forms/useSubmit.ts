"use client";

import { useEffect, useRef, useState } from "react";
import type { SubmissionKind } from "@/lib/forms/schema";

/* Shared submit behaviour for both forms.

   The state machine is deliberately explicit, because the failure mode this
   replaces was a form that set `sent = true` and never spoke to a server.
   There is no path here that reaches "sent" without a 2xx from the endpoint. */

export type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "sent" }
  | { status: "error"; message: string; fieldErrors?: Record<string, string> };

export function useSubmit(kind: SubmissionKind) {
  const [state, setState] = useState<SubmitState>({ status: "idle" });

  /* When the form became fillable, used server side to spot a submission
     that arrived faster than a person could type. Stamped after mount
     rather than during render, because reading the clock while rendering
     is impure. Zero means unknown, which the server treats as human. */
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function submit(form: HTMLFormElement) {
    setState({ status: "submitting" });

    const data = new FormData(form);
    const fields: Record<string, string> = {};
    for (const [key, value] of data.entries()) {
      if (typeof value === "string" && key !== "website") fields[key] = value;
    }

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind,
          fields,
          website: String(data.get("website") ?? ""),
          startedAt: startedAt.current,
        }),
      });

      const payload = (await res.json().catch(() => null)) as
        | { ok: boolean; error?: string; fieldErrors?: Record<string, string> }
        | null;

      if (res.ok && payload?.ok) {
        setState({ status: "sent" });
        return;
      }

      setState({
        status: "error",
        message:
          payload?.error ??
          "Something went wrong on our side. Nothing was sent.",
        fieldErrors: payload?.fieldErrors,
      });
    } catch {
      setState({
        status: "error",
        message:
          "We could not reach the server, so nothing was sent. Check your connection and try again.",
      });
    }
  }

  function reset() {
    startedAt.current = Date.now();
    setState({ status: "idle" });
  }

  return { state, submit, reset };
}

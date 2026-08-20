// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { CountUp } from "@/components/ui/CountUp";

/* The live site rendered "0%" for a target of 50 and "0" for a target of 5,
   because the component started at zero on the server and only ever left
   zero if an intersection callback fired.

   These tests make that regression impossible: whatever happens to the
   observer, the frame loop or the reduced-motion preference, the component
   must end on its target. */

afterEach(cleanup);

describe("CountUp always reaches its target", () => {
  it("ends at 47", async () => {
    render(<CountUp value="47" duration={20} />);
    await waitFor(() => expect(screen.getByText("47")).toBeDefined());
  });

  /* The exact regression: the server used to emit zero, so a visitor whose
     JavaScript failed, or whose observer never fired, was left looking at
     "0%" where the site meant "50%". The server must emit the real value. */
  it("renders the real value on the server, never zero", () => {
    const serverText = (value: string) =>
      renderToStaticMarkup(<CountUp value={value} />).replace(/<[^>]*>/g, "");

    expect(serverText("50%")).toBe("50%");
    expect(serverText("5 days")).toBe("5 days");
    expect(serverText("47")).toBe("47");
  });

  it("preserves a suffix", async () => {
    render(<CountUp value="5 days" duration={20} />);
    await waitFor(() => expect(screen.getByText("5 days")).toBeDefined());
  });

  it("preserves a prefix", async () => {
    render(<CountUp value="$1,200" duration={20} />);
    await waitFor(() => expect(screen.getByText("$1,200")).toBeDefined());
  });

  it("passes through a value with no number at all", () => {
    const { container } = render(<CountUp value="Not yet measurable" />);
    expect(container.textContent).toBe("Not yet measurable");
  });

  it("settles on the target even if the frame loop never runs", async () => {
    const original = globalThis.requestAnimationFrame;
    globalThis.requestAnimationFrame = (() => 0) as typeof requestAnimationFrame;

    try {
      render(<CountUp value="10" duration={10} />);
      await waitFor(
        () => expect(screen.getByText("10")).toBeDefined(),
        { timeout: 2000 }
      );
    } finally {
      globalThis.requestAnimationFrame = original;
    }
  });
});

/* jsdom has no IntersectionObserver and an incomplete matchMedia, both of
   which the motion hooks reach for. Stubbing them here keeps the component
   test focused on the behaviour under test.

   The globals are reached through an index signature rather than through
   `window`, because narrowing on a lib.dom type that already declares these
   properties collapses the negative branch to `never`. */

const globals =
  typeof window === "undefined"
    ? null
    : (window as unknown as Record<string, unknown>);

if (globals && typeof globals.IntersectionObserver === "undefined") {
  class StubIntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin: string = "";
    readonly thresholds: ReadonlyArray<number> = [];

    private readonly callback: IntersectionObserverCallback;

    constructor(callback: IntersectionObserverCallback) {
      this.callback = callback;
    }

    observe(target: Element): void {
      /* Report the element as intersecting on the next tick, which is what a
         real observer does for an element already in view. */
      queueMicrotask(() => {
        this.callback(
          [
            {
              isIntersecting: true,
              intersectionRatio: 1,
              target,
              boundingClientRect: target.getBoundingClientRect(),
              intersectionRect: target.getBoundingClientRect(),
              rootBounds: null,
              time: 0,
            } as IntersectionObserverEntry,
          ],
          this as unknown as IntersectionObserver
        );
      });
    }

    unobserve(): void {}
    disconnect(): void {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }

  globals.IntersectionObserver = StubIntersectionObserver;
}

if (globals && typeof globals.matchMedia === "undefined") {
  globals.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

/// <reference types="vitest/importMeta" />

/* -------------------------------------------------------------------------- */
/*                                  Types                                     */
/* -------------------------------------------------------------------------- */
export type Availability = { start: Date; end: Date };

/* -------------------------------------------------------------------------- */
/*                               Core helper                                  */
/* -------------------------------------------------------------------------- */
export function isOverlap(a: Availability, b: Availability): boolean {
  // Two slots overlap if each starts before the other ends.
  return a.start < b.end && b.start < a.end;
}

/* -------------------------------------------------------------------------- */
/*                         Inline Vitest unit test                            */
/* -------------------------------------------------------------------------- */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-expect-error — `vitest` is injected only when `vitest` runs, so it
// isn’t present during a regular Next.js build.
if (import.meta.vitest) {
  // @ts-ignore – same reason as above
  const { test, expect } = import.meta.vitest;

  test('isOverlap detects overlap', () => {
    expect(
      isOverlap(
        { start: new Date('2025-01-01T12:00'), end: new Date('2025-01-01T13:00') },
        { start: new Date('2025-01-01T12:30'), end: new Date('2025-01-01T14:00') },
      ),
    ).toBe(true);

    expect(
      isOverlap(
        { start: new Date('2025-01-01T15:00'), end: new Date('2025-01-01T16:00') },
        { start: new Date('2025-01-01T16:00'), end: new Date('2025-01-01T17:00') },
      ),
    ).toBe(false);
  });
}

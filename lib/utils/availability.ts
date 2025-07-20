/// <reference types="vitest/importMeta" />

/* -------------------------------------------------------------------------- */
/*                                  Types                                     */
/* -------------------------------------------------------------------------- */
export type Availability = { start: Date; end: Date };

/* -------------------------------------------------------------------------- */
/*                               Core helper                                  */
/* -------------------------------------------------------------------------- */
// Returns true if two time slots overlap
export function isOverlap(a: { start: Date; end: Date }, b: { start: Date; end: Date }): boolean {
  return a.start < b.end && b.start < a.end;
}

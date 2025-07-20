// Returns true if two time slots overlap
export function isOverlap(a: { start: Date; end: Date }, b: { start: Date; end: Date }): boolean {
  return a.start < b.end && b.start < a.end;
}

// Unit test
if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test('isOverlap detects overlap', () => {
    expect(isOverlap(
      { start: new Date('2024-06-01T10:00'), end: new Date('2024-06-01T12:00') },
      { start: new Date('2024-06-01T11:00'), end: new Date('2024-06-01T13:00') }
    )).toBe(true);
    expect(isOverlap(
      { start: new Date('2024-06-01T10:00'), end: new Date('2024-06-01T12:00') },
      { start: new Date('2024-06-01T12:00'), end: new Date('2024-06-01T13:00') }
    )).toBe(false);
  });
} 
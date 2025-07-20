import { describe, it, expect } from 'vitest';
import { isOverlap } from '../lib/utils/availability';

describe('isOverlap', () => {
  it('detects overlapping slots', () => {
    expect(isOverlap(
      { start: new Date('2024-06-01T10:00'), end: new Date('2024-06-01T12:00') },
      { start: new Date('2024-06-01T11:00'), end: new Date('2024-06-01T13:00') }
    )).toBe(true);
  });

  it('detects non-overlapping slots', () => {
    expect(isOverlap(
      { start: new Date('2024-06-01T10:00'), end: new Date('2024-06-01T12:00') },
      { start: new Date('2024-06-01T12:00'), end: new Date('2024-06-01T13:00') }
    )).toBe(false);
  });
}); 
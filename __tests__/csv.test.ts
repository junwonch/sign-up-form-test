import { describe, it, expect } from 'vitest';
import { toCSV } from '../lib/utils/csv';

describe('toCSV', () => {
  it('converts array of objects to CSV', () => {
    const rows = [
      { a: 1, b: 'x' },
      { a: 2, b: 'y' },
    ];
    expect(toCSV(rows)).toBe('a,b\n"1","x"\n"2","y"');
  });

  it('handles empty array', () => {
    expect(toCSV([])).toBe('');
  });
}); 
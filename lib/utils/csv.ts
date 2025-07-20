export function toCSV<T extends Record<string, any>>(rows: T[]): string {
  if (!rows.length) return '';
  const headers = Object.keys(rows[0]);
  const escape = (v: any) => `"${String(v).replace(/"/g, '""')}`;
  return [
    headers.join(','),
    ...rows.map(row => headers.map(h => escape(row[h] ?? '')).join(',')),
  ].join('\n');
}

// Unit test
if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test('toCSV basic', () => {
    const rows = [
      { a: 1, b: 'x' },
      { a: 2, b: 'y' },
    ];
    expect(toCSV(rows)).toBe('a,b\n"1","x"\n"2","y"');
  });
} 
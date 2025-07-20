export function toCSV<T extends Record<string, any>>(rows: T[]): string {
  if (!rows.length) return '';
  const headers = Object.keys(rows[0]);
  const escape = (v: any) => `"${String(v).replace(/"/g, '""')}"`;
  return [
    headers.join(','),
    ...rows.map(row => headers.map(h => escape(row[h] ?? '')).join(',')),
  ].join('\n');
} 
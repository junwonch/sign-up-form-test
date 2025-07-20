import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import { toCSV } from '../../lib/utils/csv';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { password } = req.body;
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const participants = await prisma.participant.findMany({
    include: { availabilities: true },
    orderBy: { name: 'asc' },
  });
  if (req.query.csv) {
    // Flatten for CSV
    const rows = participants.flatMap(p =>
      p.availabilities.length
        ? p.availabilities.map(a => ({
            name: p.name,
            email: p.email,
            instrument: p.instrument.join('; '),
            notes: p.notes ?? '',
            start: a.start.toISOString(),
            end: a.end.toISOString(),
          }))
        : [{
            name: p.name,
            email: p.email,
            instrument: p.instrument.join('; '),
            notes: p.notes ?? '',
            start: '',
            end: '',
          }]
    );
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="participants.csv"');
    res.send(toCSV(rows));
    return;
  }
  res.json(participants);
} 
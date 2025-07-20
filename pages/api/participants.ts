import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { name, email, instrument, notes, availabilities } = req.body;
  if (!name || !email || !instrument || !Array.isArray(availabilities)) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const participant = await prisma.participant.upsert({
      where: { email },
      update: {
        name,
        instrument,
        notes,
        availabilities: {
          deleteMany: {},
          create: availabilities.map((a: any) => ({ start: new Date(a.start), end: new Date(a.end) })),
        },
      },
      create: {
        name,
        email,
        instrument,
        notes,
        availabilities: {
          create: availabilities.map((a: any) => ({ start: new Date(a.start), end: new Date(a.end) })),
        },
      },
      include: { availabilities: true },
    });
    res.json(participant);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
} 
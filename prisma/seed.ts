import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const participant = await prisma.participant.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      name: 'Alice Example',
      email: 'alice@example.com',
      instrument: ['Piano'],
      notes: 'Prefers evenings',
      availabilities: {
        create: [
          {
            start: new Date('2024-09-06T18:00:00Z'),
            end: new Date('2024-09-06T22:00:00Z'),
          },
        ],
      },
    },
  });
  console.log({ participant });
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect()); 
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@kmrl.local' },
    update: {},
    create: {
      email: 'admin@kmrl.local',
      password: hashed,
      role: 'ADMIN'
    }
  });
}

main()
  .then(() => console.log('Seeded admin user'))
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());

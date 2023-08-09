import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();

  console.log('Seeding...');

  const user1WithOrg1 = await prisma.user.create({
    data: {
      email: 'user1@abc.com',
      deviceToken: 'token1',
      firstName: 'fname1',
      lastName: 'lname1',
      organization: {
        create: { name: 'company1', email: 'abc@company1.com' },
      },
    },
  });

  const user2WithOrg2 = await prisma.user.create({
    data: {
      email: 'user2@abc.com',
      deviceToken: 'token2',
      firstName: 'fname2',
      lastName: 'lname2',
      organization: {
        create: { name: 'company2', email: 'abc@company2.com' },
      },
    },
  });

  console.log({ user1WithOrg1, user2WithOrg2 });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

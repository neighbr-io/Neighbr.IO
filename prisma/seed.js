const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const accountTypeData = ['admin', 'pledge', 'business', 'business+pledger'];
const categoryData = [
  'Coffee Shop', 'Restaurant', 'Wine and Spirits', 'Bookstore', 'Barbershop and Salon',
  'Pet Grooming and Supplies', 'Bakery', 'Nursery', 'Entertainment', 'Grocery Store',
  'Auto Mechanic', 'Gym', 'Other'
];

const userData = [ 
  {
    email: 'admin@neighbr.io',
    password: 'abc123', // Passwords will be hashed before being stored
    accountTypeId: 1,
  },
  {
    email: 'janedoe@email.com',
    password: 'def456', 
    accountTypeId: 2,
  },
  {
    email: 'barista@llamacafe.com',
    password: 'coffee', 
    accountTypeId: 3,
  },
  {
    email: 'karma@email.com',
    password: 'giveandtake', 
    accountTypeId: 4,
  }
];

async function main() {
  // Seed AccountType data
  for (const type of accountTypeData) {
    await prisma.accountType.create({
      data: { type },
    });
  }

  // Seed Category data
  for (const category of categoryData) {
    await prisma.category.create({
      data: { category },
    });
  }

  // Seed User data with encrypted password
  for (const user of userData) {
    const hashedPassword = await bcrypt.hash(user.password, 10); // Hash the password
    await prisma.user.create({
      data: {
        email: user.email,
        password: hashedPassword,
        accountTypeId: user.accountTypeId, 
      },
    });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

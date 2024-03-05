const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const accountTypeData = ["admin", "pledge", "business", "business+pledger"];

const categoryData = [
  "Coffee Shop",
  "Restaurant",
  "Wine and Spirits",
  "Bookstore",
  "Barbershop and Salon",
  "Pet Grooming and Supplies",
  "Bakery",
  "Nursery",
  "Entertainment",
  "Grocery Store",
  "Auto Mechanic",
  "Gym",
  "Other",
];

const projectData = [
  {
    title: "Community-Driven Artisan Coffee Shop",
    subtitle: "Brewing connections, one cup at a time.",
    categoryId: 1,
    story: "In the heart of our city, we dream of our coffee shop serves as a hub for community and culture, offering locally sourced coffee and a space for artists to display their work.",
    faq: "Frequently Asked Questions about our mission, coffee sources, and community events.",
    updates: "Stay tuned for updates on our menu development, and featured local artists.",
    goal: 15000,
    funded: 0,
    expiration: new Date('2024-06-30T23:59:59'), 
    userId: 3,
  },
];

const locationData = [
  {
    businessName:   "The Coffee Shop",
    houseNumber:    "1600",
    aptSuiteOther:  "Ground floor",
    street:         "Broadway",
    city:           "New York",
    state:          "NY",
    zipcode:        "10005",
    lat:            "40.7627",
    lon:            "73.9683",
    projectId:      1,
  },
]

const userData = [
  {
    email: "admin@neighbr.io",
    password: "abc123", // Passwords will be hashed before being stored
    accountTypeId: 1,
  },
  {
    email: "janedoe@email.com",
    password: "def456",
    accountTypeId: 2,
  },
  {
    email: "barista@llamacafe.com",
    password: "coffee",
    accountTypeId: 3,
  },
  {
    email: "karma@email.com",
    password: "giveandtake",
    accountTypeId: 4,
  },
];

async function main() {
  // Seed AccountType data
  for (const type of accountTypeData) {
    const existingType = await prisma.accountType.findUnique({
      where: { type },
    });
    if (!existingType) {
      await prisma.accountType.create({
        data: { type },
      });
    }
  }

  // Seed Category data
  for (const category of categoryData) {
    const existingCategory = await prisma.category.findUnique({
      where: { category },
    });
    if (!existingCategory) {
      await prisma.category.create({
        data: { category },
      });
    }
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

  // Seed project data
  console.log("Seeding projects...");
  for (const project of projectData) {
    await prisma.project.create({
      data: {
        ...project,
      },
    });
  }

  console.log("Seeding locations...");
  for (const location of locationData) {
    await prisma.location.create({
      data: {
        ...location,
      },
    });
  }

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

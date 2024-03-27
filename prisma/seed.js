const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const accountTypeData = ["admin", "pledge", "business", "business+pledger"];

const categoryData = [
  "Coffee Shop",
  "Restaurant",
  "Wine and Spirits",
  "Education and Bookstore",
  "Barbershop and Salon",
  "Pet Grooming and Supplies",
  "Bakery",
  "Nursery",
  "Arts and Craft",
  "Entertainment",
  "Grocery Store",
  "Auto Mechanic",
  "Gym",
  "Other",
];

const userData = [
  {
    email: "admin@neighbr.io", //1
    password: "abc123", // Passwords will be hashed before being stored
    accountTypeId: 1,
  },
  {
    email: "janedoe@email.com", //2
    password: "def456",
    accountTypeId: 2,
  },
  {
    email: "barista@llamacafe.com", //3
    password: "coffee",
    accountTypeId: 3,
  },
  {
    email: "karma@email.com", //4
    password: "giveandtake",
    accountTypeId: 4,
  },
  {
    email: "catsndogs@email.com", //5
    password: "catsndogs",
    accountTypeId: 3,
  },
  {
    email: "cratfsguru@email.com", //6
    password: "makeapaperplane",
    accountTypeId: 3,
  },
  {
    email: "broccoli@email.com", //7
    password: "iloveveggies",
    accountTypeId: 3,
  },
  {
    email: "flyingwheels@email.com", //8
    password: "bikebike",
    accountTypeId: 3,
  },
];

const projectData = [
  {
    title: "Community-Driven Artisan Coffee Shop",
    subtitle: "Brewing connections, one cup at a time.",
    categoryId: 1,
    story:
      "In the heart of our city, we dream of our coffee shop serves as a hub for community and culture, offering locally sourced coffee and a space for artists to display their work.",
    faq: "Frequently Asked Questions about our mission, coffee sources, and community events.",
    updates:
      "Stay tuned for updates on our menu development, and featured local artists.",
    goal: 15000,
    funded: 0,
    priceTier1:  100,
    rewardTier1: "Enjoy 30 cups of specialty coffee from us!",
    priceTier2:  300,
    rewardTier2: "Enjoy up to 1 cup of specialty coffee from us every day of the year!",
    priceTier3:  400,
    rewardTier3: "One cup of specialty coffee from us and a coffee workshop.",
    expiration: new Date("2024-06-30T23:59:59"),
    userId: 3,
    status: "live",
  },
  {
    title: "Urban Green Space Initiative",
    subtitle: "Cultivating a greener future, together.",
    categoryId: 14,
    story:
      "Our project aims to transform neglected city areas into vibrant green spaces, fostering community well-being and environmental stewardship.",
    faq: "Learn more about our green space projects, volunteering, and how you can contribute.",
    updates:
      "Check back for updates on our latest green space projects, events, and volunteer opportunities.",
    goal: 20000,
    funded: 3008,
    priceTier1:  100,
    rewardTier1: "1-year free monthly subscription of flowers delivered to your door",
    expiration: new Date("2024-12-31T23:59:59"),
    userId: 4,
    status: "live",
  },
  {
    title: "Mobile Pet Grooming Service",
    subtitle: "Convenient, Compassionate Care for Your Pets.",
    categoryId: 6,
    story:
      "Bringing professional pet grooming to your doorstep. We ensure your pets look their best, without the stress of travel.",
    faq: "Frequently Asked Questions about our services, booking process, and care for your pets.",
    updates:
      "Stay updated with our service areas expansion, seasonal tips, and special offers.",
    goal: 5000,
    funded: 0,
    priceTier1:  100,
    rewardTier1: "One pet grooming session.",
    priceTier2:  200,
    rewardTier2: "Three pet grooming session.",
    expiration: new Date("2024-05-31T23:59:59"),
    userId: 5,
    status: "live",
  },
  {
    title: "Reviving Traditional Crafts",
    subtitle: "Preserving heritage, crafting the future.",
    categoryId: 9,
    story:
      "Join us in keeping traditional crafts alive! Our workshops offer hands-on learning from local artisans, ensuring these valuable skills are passed on.",
    faq: "Questions about our workshops, how to get involved, and the artisans we support.",
    updates:
      "Don't miss out on new workshop announcements, featured artisans, and craft fairs.",
    goal: 12000,
    funded: 10453,
    priceTier1:  50,
    rewardTier1: "Enjoy 2 hours of studio time with the craft of your choice!",
    expiration: new Date("2024-06-30T23:59:59"),
    userId: 6,
    status: "live",
  },
  {
    title: "Sustainable Farming Co-op",
    subtitle: "Growing together, sustainably.",
    categoryId: 14,
    story:
      "Our co-op supports local farmers in adopting sustainable practices, producing healthy food for our community while caring for the Earth.",
    faq: "Your questions about sustainable farming practices, how to join the co-op, and our produce answered here.",
    updates:
      "Keep up with our farming progress, co-op news, and how you can get involved in sustainable food initiatives.",
    goal: 25000,
    funded: 22036,
    priceTier1:  100,
    rewardTier1: "Enjoy our year-round fresh produce delivery",
    priceTier2:  250,
    rewardTier2: "Year-round fresh produce delivery plus unlimited access to our farm.",
    expiration: new Date("2024-06-30T23:59:59"),
    userId: 7,
    status: "live",
  },
  {
    title: "Community Cycling Workshop",
    subtitle: "Pedal power to the people!",
    categoryId: 14,
    story:
      "Our workshop promotes cycling by providing affordable bike repairs, workshops, and group rides, encouraging a healthy, eco-friendly mode of transport.",
    faq: "Everything you need to know about our services, how to donate a bike, and joining our community rides.",
    updates:
      "Follow our journey as we expand our workshop services, community rides, and cycling advocacy.",
    goal: 8000,
    funded: 3753,
    priceTier1:  20,
    rewardTier1: "Bring your bike in for a check up!",
    priceTier2:  100,
    rewardTier2: "20% off selected bikes.",
    expiration: new Date("2024-06-30T23:59:59"),
    userId: 8,
    status: "live",
  },
];

const locationData = [
  {
    businessName: "The Coffee Shop",
    houseNumber: "1600",
    aptSuiteOther: "Ground floor",
    street: "Broadway",
    city: "New York",
    state: "NY",
    zipcode: "10005",
    lat: "40.7627",
    lon: "73.9683",
    projectId: 1,
  },
];

const transactionData = [
  {
    amount: 100.0,
    createdAt: new Date(), // Uses the current date and time
    updatedAt: new Date(), // Uses the current date and time
    type: "payment",
    paymentMethod: "credit_card",
    projectId: 1,
    status: "completed",
    userId: 2,
    gatewayTxnId: "txn_123456789",
  },
  {
    amount: 250.0,
    createdAt: new Date(), // Uses the current date and time
    updatedAt: new Date(), // Uses the current date and time
    type: "payment",
    paymentMethod: "credit_card",
    projectId: 4,
    status: "completed",
    userId: 4,
    gatewayTxnId: "txn_987654321",
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

  // Seed location data
  console.log("Seeding locations...");
  for (const location of locationData) {
    await prisma.location.create({
      data: {
        ...location,
      },
    });
  }

  console.log("Seeding transactions...");
  for (const transaction of transactionData) {
    await prisma.transaction.create({
      data: {
        ...transaction,
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
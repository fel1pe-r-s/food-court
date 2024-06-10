import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  await prisma.user.deleteMany();
  await prisma.order.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.product.deleteMany();

  const passwordHash = await hash("123456", 1);

  await prisma.user.create({
    data: {
      name: "John administration",
      email: "john@admin.com",
      passwordHash,
      role: "ADMIN",
    },
  });

  const userCustomer = await prisma.user.create({
    data: {
      name: "John customer",
      email: "john@customer.com",
      passwordHash,
    },
  });

  const product = await prisma.product.create({
    data: {
      name: faker.commerce.productName(),
      imageUrl: "",
      description: faker.lorem.paragraphs(1),
      priceInCents: Number(faker.commerce.price({ min: 10, max: 100 })),
      ingredients: [
        faker.commerce.productName(),
        faker.commerce.productName(),
        faker.commerce.productName(),
      ],
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: faker.commerce.productName(),
      imageUrl: "",
      description: faker.lorem.paragraphs(1),
      priceInCents: Number(faker.commerce.price({ min: 10, max: 100 })),
      ingredients: [
        faker.commerce.productName(),
        faker.commerce.productName(),
        faker.commerce.productName(),
      ],
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: faker.commerce.productName(),
      imageUrl: "",
      priceInCents: Number(faker.commerce.price({ min: 10, max: 100 })),
      description: faker.lorem.paragraphs(1),
      ingredients: [
        faker.commerce.productName(),
        faker.commerce.productName(),
        faker.commerce.productName(),
      ],
    },
  });

  // Create 3 orders for the customer user
  for (let i = 0; i < 3; i++) {
    const orderItems = [
      {
        productId: product.id,
        quantity: faker.number.int({ min: 1, max: 5 }),
        priceInCents: product.priceInCents,
      },
      {
        productId: product2.id,
        quantity: faker.number.int({ min: 1, max: 5 }),
        priceInCents: product2.priceInCents,
      },
      {
        productId: product3.id,
        quantity: faker.number.int({ min: 1, max: 5 }),
        priceInCents: product3.priceInCents,
      },
    ];

    const totalInCents = orderItems.reduce(
      (total, item) => total + item.priceInCents * item.quantity,
      0
    );

    const order = await prisma.order.create({
      data: {
        customerId: userCustomer.id,
        totalInCents,
        OrderItem: {
          create: orderItems,
        },
      },
    });
  }
}

seed().then(() => {
  console.log("Database seeded!");
});

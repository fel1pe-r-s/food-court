import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class ProductPrismaRepository {
  async create(data: Prisma.ProductCreateInput) {
    return await prisma.product.create({
      data,
    });
  }
  async getMany() {
    const products = await prisma.product.findMany();
    return products;
  }
  async searchMany(query: string) {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            ingredients: {
              has: query,
            },
          },
        ],
      },
    });
    return products;
  }

  async update(id: string, product: Prisma.ProductUpdateInput) {
    const products = await prisma.product.update({
      where: {
        id: id,
      },
      data: product,
    });

    return products;
  }
}

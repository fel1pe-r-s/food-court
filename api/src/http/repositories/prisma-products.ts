import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class ProductPrismaRepository {
  async create(data: Prisma.ProductCreateInput) {
    return await prisma.product.create({
      data,
    });
  }

  async searchMany() {
    const products = await prisma.product.findMany();
    return products;
  }
}

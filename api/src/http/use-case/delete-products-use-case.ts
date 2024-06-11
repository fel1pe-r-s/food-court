import { ProductPrismaRepository } from "@/http/repositories/prisma-products";

export class DeleteProductsUseCase {
  constructor(private productRepository: ProductPrismaRepository) {}
  async execute(id: string) {
    return await this.productRepository.delete(id);
  }
}

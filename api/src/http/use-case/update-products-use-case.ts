import { ProductPrismaRepository } from "@/http/repositories/prisma-products";

interface UpdateProductUseCaseRequest {
  id: string;
  product: {
    name?: string;
    description?: string | null;
    priceInCents?: number;
    imageUrl?: string;
    ingredients?: string[];
    favourite?: boolean;
  };
}

export class UpdateProductsUseCase {
  constructor(private productRepository: ProductPrismaRepository) {}
  async execute({ id, product }: UpdateProductUseCaseRequest) {
    return await this.productRepository.update(id, product);
  }
}

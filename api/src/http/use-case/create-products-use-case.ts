import { ProductPrismaRepository } from "@/http/repositories/prisma-products";

interface CreateProductUseCaseRequest {
  name: string;
  description: string | null;
  priceInCents: number;
  imageUrl: string;
  ingredients?: string[];
  favourite?: boolean;
}

export class CreateProductsUseCase {
  constructor(private productRepository: ProductPrismaRepository) {}
  async execute(data: CreateProductUseCaseRequest) {
    return await this.productRepository.create(data);
  }
}

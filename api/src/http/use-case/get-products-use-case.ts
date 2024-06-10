import { ProductPrismaRepository } from "@/http/repositories/prisma-products";

interface GetProductUseCaseResponse {
  products: {
    id: string;
    name: string;
    description: string | null;
    priceInCents: number;
    imageUrl: string;
    ingredients: string[];
    favourite: boolean;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

export class GetProductsUseCase {
  constructor(private productRepository: ProductPrismaRepository) {}
  async execute(): Promise<GetProductUseCaseResponse> {
    const products = await this.productRepository.getMany();
    return {
      products,
    };
  }
}

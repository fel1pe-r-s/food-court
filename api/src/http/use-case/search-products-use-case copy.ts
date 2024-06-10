import { ProductPrismaRepository } from "@/http/repositories/prisma-products";

interface SearchProductUseCaseRequest {
  query: string;
}

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

export class SearchProductsUseCase {
  constructor(private productRepository: ProductPrismaRepository) {}
  async execute({
    query,
  }: SearchProductUseCaseRequest): Promise<GetProductUseCaseResponse> {
    const products = await this.productRepository.searchMany(query);

    return {
      products,
    };
  }
}

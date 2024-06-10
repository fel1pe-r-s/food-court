import { FastifyReply, FastifyRequest } from "fastify";
import { ProductPrismaRepository } from "../../repositories/prisma-products";
import { SearchProductsUseCase } from "@/http/use-case/search-products-use-case copy";
import { z } from "zod";

const searchProductUseCaseResponse = z.object({
  query: z.string(),
});

export async function searchProducts(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const productPrismaRepository = new ProductPrismaRepository();
  const searchProducts = new SearchProductsUseCase(productPrismaRepository);

  const query = searchProductUseCaseResponse.parse(request.query);

  const { products } = await searchProducts.execute(query);

  return reply.status(200).send({
    products,
  });
}

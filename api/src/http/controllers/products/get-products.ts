import { FastifyReply, FastifyRequest } from "fastify";
import { GetProductsUseCase } from "../../use-case/get-products-use-case";
import { ProductPrismaRepository } from "../../repositories/prisma-products";

export async function getProducts(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const productPrismaRepository = new ProductPrismaRepository();
  const getProducts = new GetProductsUseCase(productPrismaRepository);
  let { products } = await getProducts.execute();

  return reply.status(200).send({
    products,
  });
}

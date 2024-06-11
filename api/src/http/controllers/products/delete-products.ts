import { FastifyReply, FastifyRequest } from "fastify";
import { ProductPrismaRepository } from "@/http/repositories/prisma-products";
import { z } from "zod";
import { DeleteProductsUseCase } from "@/http/use-case/delete-products-use-case";

const deleteProductUseCaseRequest = z.object({
  id: z.string(),
});

export async function deleteProducts(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const productPrismaRepository = new ProductPrismaRepository();
  const deleteProducts = new DeleteProductsUseCase(productPrismaRepository);

  const { id } = deleteProductUseCaseRequest.parse(request.params);

  const isDelete = await deleteProducts.execute(id);

  if (isDelete) {
    return reply.status(200).send();
  }
  return reply.status(400).send({
    message: "Product not delete",
  });
}

import { FastifyReply, FastifyRequest } from "fastify";
import { ProductPrismaRepository } from "@/http/repositories/prisma-products";
import { z } from "zod";
import { UpdateProductsUseCase } from "@/http/use-case/update-products-use-case";

const updateProductUseCaseRequest = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  priceInCents: z.number().optional(),
  imageUrl: z.string().optional(),
  ingredients: z.array(z.string()).optional(),
  favourite: z.boolean().optional(),
});

const idUpdateProductUseCaseRequest = z.object({
  id: z.string(),
});

export async function updateProducts(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const productPrismaRepository = new ProductPrismaRepository();
  const updateProducts = new UpdateProductsUseCase(productPrismaRepository);

  const { id } = idUpdateProductUseCaseRequest.parse(request.params);
  const product = updateProductUseCaseRequest.parse(request.body);

  const products = await updateProducts.execute({
    id,
    product,
  });

  if (products) {
    return reply.status(200).send({
      products,
    });
  }

  return reply.status(400).send({
    message: "Product not update",
  });
}

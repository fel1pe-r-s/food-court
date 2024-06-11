import { FastifyReply, FastifyRequest } from "fastify";
import { ProductPrismaRepository } from "@/http/repositories/prisma-products";
import { CreateProductsUseCase } from "@/http/use-case/create-products-use-case";
import { z } from "zod";

const createProductUseCaseRequest = z.object({
  name: z.string(),
  description: z.string().nullable(),
  priceInCents: z.number(),
  imageUrl: z.string(),
  ingredients: z.array(z.string()).optional(),
  favourite: z.boolean().optional(),
});

export async function createProducts(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const productPrismaRepository = new ProductPrismaRepository();
  const createProducts = new CreateProductsUseCase(productPrismaRepository);

  const { name, description, priceInCents, imageUrl, ingredients, favourite } =
    createProductUseCaseRequest.parse(request.body);
  const product = await createProducts.execute({
    name,
    description,
    priceInCents,
    imageUrl,
    ingredients,
    favourite,
  });

  if (product) {
    return reply.status(201).send();
  }

  return reply.status(400).send({
    message: "Product not created",
  });
}

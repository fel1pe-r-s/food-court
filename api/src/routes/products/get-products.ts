import { FastifyReply, FastifyRequest } from "fastify";

export async function getProducts(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const product = {
    id: "1",
    name: "Product 1",
    description: "Product 1 description",
    price: 100,
    stock: 100,
  };

  return reply.status(200).send({
    product,
  });
  return {};
}

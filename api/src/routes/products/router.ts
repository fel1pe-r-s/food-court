import { FastifyInstance } from "fastify";
import { getProducts } from "./get-products";

export async function productsRoute(app: FastifyInstance) {
  app.get("/products", getProducts);
}

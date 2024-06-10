import { FastifyInstance } from "fastify";
import { getProducts } from "./get-products";
import { createProducts } from "./create-products";

export async function productsRoute(app: FastifyInstance) {
  app.get(
    "/products",
    {
      schema: {
        tags: ["product"],
        summary: "Get all Products",
      },
    },
    getProducts
  );

  app.post(
    "/product",
    {
      schema: {
        tags: ["product"],
        summary: "Create Product",
      },
    },
    createProducts
  );
}

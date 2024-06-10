import { FastifyInstance } from "fastify";
import { getProducts } from "./get-products";
import { createProducts } from "./create-products";
import { searchProducts } from "./search-products";

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
  app.get(
    "/products/search/:query",
    {
      schema: {
        tags: ["product"],
        summary: "Search Product",
      },
    },
    searchProducts
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

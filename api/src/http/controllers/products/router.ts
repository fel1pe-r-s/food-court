import { FastifyInstance } from "fastify";
import { getProducts } from "./get-products";
import { createProducts } from "./create-products";
import { searchProducts } from "./search-products";
import { verifYUserRole } from "@/http/middlewares/verify-user-role";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { updateProducts } from "./update-product";
import { deleteProducts } from "./delete-products";

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
  app.addHook("onRequest", verifyJWT);
  app.post(
    "/product",
    {
      onRequest: [verifYUserRole("ADMIN")],
      schema: {
        tags: ["product"],
        summary: "create Product",
      },
    },
    createProducts
  );
  app.patch(
    "/product/:id",
    {
      onRequest: [verifYUserRole("ADMIN")],
      schema: {
        tags: ["product"],
        summary: "create Product",
      },
    },
    updateProducts
  );
  app.delete(
    "/product/:id",
    {
      onRequest: [verifYUserRole("ADMIN")],
      schema: {
        tags: ["product"],
        summary: "create Product",
      },
    },
    deleteProducts
  );
}

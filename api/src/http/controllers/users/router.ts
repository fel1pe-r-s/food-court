import { FastifyInstance } from "fastify";
import { registerProducts } from "./register";

export async function registerRoute(app: FastifyInstance) {
  app.post(
    "/register",
    {
      schema: {
        tags: ["Authentication"],
        summary: "Create User",
      },
    },
    registerProducts
  );
}

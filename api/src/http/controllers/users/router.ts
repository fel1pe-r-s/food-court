import { FastifyInstance } from "fastify";
import { registerProducts } from "./register";
import { authenticate } from "./authentication";

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

  app.post(
    "/sessions",
    {
      schema: {
        tags: ["Authentication"],
        summary: "Authenticate User",
      },
    },
    authenticate
  );
}

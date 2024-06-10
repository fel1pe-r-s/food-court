// Import the framework and instantiate it
import Fastify from "fastify";
import { productsRoute } from "@/routes/products/router";

export const app = Fastify({
  logger: true,
});

app.register(productsRoute);

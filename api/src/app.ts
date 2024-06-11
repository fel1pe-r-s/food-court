import Fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { jsonSchemaTransform } from "fastify-type-provider-zod";
import { productsRoute } from "@/http/controllers/products/router";
import { registerRoute } from "./http/controllers/users/router";
import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import { env } from "process";

export const app = Fastify({
  logger: false,
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Next.js SaaS",
      description: "Full-stack SaaS with multi-tenant & RBAC.",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifyCookie);
app.register(fastifyJwt, {
  secret: "secret",
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});
app.register(productsRoute);
app.register(registerRoute);

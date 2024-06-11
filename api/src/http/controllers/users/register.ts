import { UsersPrismaRepository } from "@/http/repositories/prisma-users";
import { RegisterUseCase } from "@/http/use-case/register-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const registerRequest = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(["ADMIN", "CUSTOMER"]).optional(),
});

export async function registerProducts(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const usersPrismaRepository = new UsersPrismaRepository();
  const registerProducts = new RegisterUseCase(usersPrismaRepository);

  const { name, email, password, role } = registerRequest.parse(request.body);
  const { user } = await registerProducts.execute({
    name,
    email,
    password,
    role,
  });

  if (user) {
    return reply.status(201).send();
  }

  return reply.status(400).send({
    message: "User not created",
  });
}

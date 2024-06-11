import { UsersPrismaRepository } from "@/http/repositories/prisma-users";
import { AuthenticateUseCase } from "@/http/use-case/authentication-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const usersRepository = new UsersPrismaRepository();
  const authenticateUseCase = new AuthenticateUseCase(usersRepository);

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const { user } = await authenticateUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      }
    );

    const refreshToken = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: "7d",
        },
      }
    );

    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      });
  } catch (err: any) {
    return reply.status(400).send({ message: err.message });
  }
}

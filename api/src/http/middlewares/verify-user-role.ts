import { FastifyReply, FastifyRequest } from "fastify";

export function verifYUserRole(roleToVerify: "ADMIN" | "CUSTOMER") {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user;
    console.log(role);
    if (role !== roleToVerify) {
      return reply.status(401).send({ message: "unauthorized" });
    }
  };
}

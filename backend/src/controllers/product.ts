import type { FastifyReply, FastifyRequest } from "fastify";

export const test = async (request: FastifyRequest, reply: FastifyReply) => {
  reply.send({ message: "Hello World" });
};

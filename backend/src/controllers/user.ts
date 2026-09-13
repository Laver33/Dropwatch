import type { FastifyReply, FastifyRequest } from "fastify";

export const test = async (request: FastifyRequest, reply: FastifyReply) => {
  reply.send({ message: "Hello World" });
};

export const test2 = async (request: FastifyRequest, reply: FastifyReply) => {
  reply.send({ message: "Hello World" });
};

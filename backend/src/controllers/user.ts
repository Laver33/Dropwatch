import { type FastifyReply, type FastifyRequest } from "fastify";
import type { Register } from "../validators/register.validator";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

export const test = async (request: FastifyRequest, reply: FastifyReply) => {
  reply.send({ message: "Hello World" });
};

export const login = async (
  request: FastifyRequest<{ Body: Register }>,
  reply: FastifyReply,
) => {
  try {
    const { email, password } = request.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return reply.status(401).send({ message: "Не верные данные" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return reply.status(401).send({ message: "Не верные данные" });
    }

    // Разделение
    const { password: _, ...userWithoutPassword } = user;

    const token = request.server.jwt.sign({ userId: user.id });

    return reply.status(200).send({ token, userWithoutPassword });
  } catch (err) {
    request.log.error(err);
    return reply.status(500).send({ message: "Error login" });
  }
};

export const register = async (
  request: FastifyRequest<{ Body: Register }>,
  reply: FastifyReply,
) => {
  try {
    const { email, password } = request.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashPassword,
      },
      select: {
        id: true,
        email: true,
        plan: true,
      },
    });

    const token = request.server.jwt.sign({ userId: user.id });

    return reply.status(201).send({ token, user });
  } catch (err) {
    request.log.error(err);
    return reply.status(500).send({ message: "Error register" });
  }
};

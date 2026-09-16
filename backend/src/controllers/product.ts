import type { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";

export const productById = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params as { id: string };
    const { userId } = request.user;

    const product = await prisma.product.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!product) {
      return reply.status(404).send({ message: "Проект не найден" });
    }

    return reply.status(200).send(product);
  } catch (err) {
    request.log.error(err);
    return reply.status(500).send({ message: "Error productById" });
  }
};

export const products = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { userId } = request.user;

    const products = await prisma.product.findMany({
      where: {
        userId,
      },
    });

    if (!products) {
      return reply.status(404).send({ message: "Проекты не найдены" });
    }

    return reply.status(200).send(products);
  } catch (err) {
    request.log.error(err);
    return reply.status(500).send({ message: "Error products" });
  }
};

export const deleteProduct = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params as { id: string };
    const { userId } = request.user;

    const product = await prisma.product.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!product) {
      return reply.status(404).send({ message: "Проект не найден" });
    }

    await prisma.product.deleteMany({
      where: {
        id,
        userId,
      },
    });

    return reply.status(200).send({ message: "Проект удален" });
  } catch (err) {
    request.log.error(err);
    return reply.status(500).send({ message: "Error deleteProduct" });
  }
};

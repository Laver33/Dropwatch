import type { FastifyInstance } from "fastify";
import { userRoutes } from "./user.route.js";
import { productRoutes } from "./product.route.js";
import { historyRoutes } from "./history.route.js";

export async function registerRoutes(fastify: FastifyInstance) {
  await fastify.register(userRoutes);
  await fastify.register(productRoutes);
  await fastify.register(historyRoutes);
}

import type { FastifyInstance } from "fastify";
import * as userController from "../controllers/user.js";

export async function userRoutes(fastify: FastifyInstance) {
  // Создание юзера
  fastify.post("/user", userController.test);

  // Получение пользователя по айди
  fastify.get("/user/:id", userController.test2);
}

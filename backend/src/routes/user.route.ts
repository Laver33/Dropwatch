import type { FastifyInstance } from "fastify";
import * as userController from "../controllers/user.js";
import { registerBodySchema } from "../validators/register.validator";

export async function userRoutes(fastify: FastifyInstance) {
  // Регистрация ( + )
  fastify.post(
    "/register",
    {
      schema: {
        body: registerBodySchema,
      },
    },
    userController.register,
  );

  // Вход ( + )
  fastify.get(
    "/login",
    {
      schema: {
        body: registerBodySchema,
      },
    },
    userController.login,
  );

  // Получение пользователя по айди ( + )
  fastify.get("/user/:id", userController.userById);
}

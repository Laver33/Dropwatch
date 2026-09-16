import type { FastifyInstance } from "fastify";
import * as productController from "../controllers/product.js";

export async function productRoutes(fastify: FastifyInstance) {
  // Создание проекта

  // Проект по айди ( + )
  fastify.get(
    "/products/:id",
    {
      onRequest: [fastify.authCheck],
    },
    productController.productById,
  );

  // Проекты юзера ( + )
  fastify.get(
    "/products",
    {
      onRequest: [fastify.authCheck],
    },
    productController.products,
  );

  // Удаление проекта ( + )
  fastify.delete(
    "/products/:id",
    {
      onRequest: [fastify.authCheck],
    },
    productController.deleteProduct,
  );

  // Редактирование проекта
}

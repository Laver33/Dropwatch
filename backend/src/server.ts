import Fastify, { type FastifyReply, type FastifyRequest } from "fastify";
import "dotenv/config";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import { registerRoutes } from "./routes";
import fastifyJwt from "@fastify/jwt";

const app = Fastify({
  logger: true,
});

// Добавил в fastify декоратор авторизации
declare module "fastify" {
  interface FastifyInstance {
    authCheck: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

// Добавил в fastifyJwt декоратор токен и юзер
declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { userId: string };
    user: { userId: string };
  }
}

if (!process.env.JWT_SECRET) {
  throw new Error("Не получен JWT_SECRET с ");
}

await app.register(helmet);
await app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET,
});

await app.register(cors, {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
});

await registerRoutes(app);

app.decorate(
  "authCheck",
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      request.log.error(err);
      return reply.status(401).send({ message: "Error auth" });
    }
  },
);

const start = async () => {
  try {
    await app.listen({ port: 5012 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start().catch((e) => {
  app.log.error(e);
  process.exit(1);
});

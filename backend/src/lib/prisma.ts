import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client/extension";

const dataBaseUrl = process.env.DATABASE_URL;

if (!dataBaseUrl) {
  throw new Error("Не получена бд");
}

const adapter = new PrismaPg({
  connectionString: dataBaseUrl,
});

export const prisma = new PrismaClient({ adapter });

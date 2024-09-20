// Import the framework and instantiate it
import Fastify from "fastify";
import prisma from "./utils/prisma";
import { taskRoutes } from "./routes/task";
import { CategoryRoutes } from "./routes/category";
import { populateDB } from "./utils/populate";
import cors from "@fastify/cors";

const fastify = Fastify({
  logger: true,
});
async function main() {
  await fastify.register(cors, {
    origin: '*'
  });
  await populateDB();
  fastify.register(taskRoutes, { prefix: "/api" });
  fastify.register(CategoryRoutes, { prefix: "/api" });
  await fastify.listen({ port: 3000, host: "0.0.0.0" });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

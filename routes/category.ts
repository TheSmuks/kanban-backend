import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import prisma from "../utils/prisma";

const getCategoryOpts = {
  schema: {
    params: {
      id: { type: "number" },
    },
  },
  handler: getCategory,
};
const getCategoriesOpts = {
  handler: getAllCategories,
};
const postCategoryOpts = {
  schema: {
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
        color: { type: "string" },
        position: { type: "number" },
      },
      required: ["name", "color", "position"],
    },
  },
  handler: createCategory,
};
const deleteCategoryOpts = {
  schema: {
    params: {
      id: { type: "number" },
    },
  },
  handler: deleteCategory,
};
const putCategoryOpts = {
  schema: {
    body: {
      type: "object",
      properties: {
        id: { type: "number" },
        name: { type: "string" },
        color: { type: "string" },
        position: { type: "number" },
      },
      required: ["name", "color"],
    },
  },
  handler: updateCategory,
};
export async function CategoryRoutes(fastify: FastifyInstance) {
  fastify.get("/categories", getCategoriesOpts);
  fastify.get("/category/:id", getCategoryOpts);
  fastify.post("/category", postCategoryOpts);
  fastify.delete("/category/:id", deleteCategoryOpts);
  fastify.put("/category/:id", putCategoryOpts);
}
async function getAllCategories(req: FastifyRequest, reply: FastifyReply) {
  const res = await prisma.category.findMany({
    orderBy: {
      position: "asc",
    },
    include: {
      tasks: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(res);
}
async function getCategory(
  req: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) {
  const Category = await prisma.category.findUnique({
    where: {
      id: req.params.id,
    },
    include: {
      tasks: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(Category);
}
async function createCategory(
  req: FastifyRequest<{
    Body: { name: string; color: string; position: number };
  }>,
  reply: FastifyReply
) {
  const { name, color, position } = req.body;
  const post = await prisma.category.create({
    data: {
      name,
      color,
      position,
    },
  });
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(post);
}
async function deleteCategory(
  req: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) {
  const { id } = req.params;
  const deletedCategory = await prisma.category.delete({
    where: {
      id,
    },
  });
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(deletedCategory);
}
async function updateCategory(
  req: FastifyRequest<{
    Body: { id: number; name: string; color: string; position: number };
  }>,
  reply: FastifyReply
) {
  const { id, name, color, position } = req.body;
  const modifiedCategory = await prisma.category.update({
    where: { id },
    data: { name, color, position },
  });
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(modifiedCategory);
}

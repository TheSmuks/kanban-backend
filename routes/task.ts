import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import prisma from "../utils/prisma";

const getTaskOpts = {
  schema: {
    params: {
      id: { type: "number" },
    },
  },
  handler: getTask,
};
const getTasksOpts = {
  handler: getAllTasks,
};
const postTaskOpts = {
  schema: {
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
        description: { type: "string" },
        categoryId: { type: "number" },
        position: { type: "number" },
      },
      required: ["name", "description", "categoryId", "position"],
    },
  },
  handler: createTask,
};
const deleteTaskOpts = {
  schema: {
    params: {
      id: { type: "number" },
    },
  },
  handler: deleteTask,
};
const putTaskOpts = {
  schema: {
    body: {
      type: "object",
      properties: {
        id: { type: "number" },
        name: { type: "string" },
        description: { type: "string" },
        categoryId: { type: "number" },
        position: { type: "number" },
      },
      required: ["name", "description", "categoryId"],
    },
  },
  handler: updateTask,
};
export async function taskRoutes(fastify: FastifyInstance) {
  fastify.get("/tasks", getTasksOpts);
  fastify.get("/task/:id", getTaskOpts);
  fastify.post("/task", postTaskOpts);
  fastify.delete("/task/:id", deleteTaskOpts);
  fastify.put("/task/:id", putTaskOpts);
}
async function getAllTasks(req: FastifyRequest, reply: FastifyReply) {
  const res = await prisma.task.findMany({
    orderBy: {
      position: "asc",
    },
  });
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(res);
}
async function getTask(
  req: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) {
  const task = await prisma.task.findUnique({
    where: {
      id: req.params.id,
    },
  });
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(task);
}
async function createTask(
  req: FastifyRequest<{
    Body: {
      name: string;
      description: string;
      categoryId: number;
      position: number;
    };
  }>,
  reply: FastifyReply
) {
  const { name, description, categoryId, position } = req.body;
  const post = await prisma.task.create({
    data: {
      name,
      description,
      categoryId,
      position,
    },
  });
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(post);
}
async function deleteTask(
  req: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) {
  const { id } = req.params;
  const deletedTask = await prisma.task.delete({
    where: {
      id,
    },
  });
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(deletedTask);
}
async function updateTask(
  req: FastifyRequest<{
    Body: {
      id: number;
      name: string;
      description: string;
      categoryId: number;
      position: number;
    };
  }>,
  reply: FastifyReply
) {
  const { id, name, description, categoryId, position } = req.body;
  const modifiedTask = await prisma.task.update({
    where: { id },
    data: { name, description, categoryId, position },
  });
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(modifiedTask);
}

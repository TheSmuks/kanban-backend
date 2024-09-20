"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRoutes = taskRoutes;
const prisma_1 = __importDefault(require("../utils/prisma"));
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
function taskRoutes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.get("/tasks", getTasksOpts);
        fastify.get("/task/:id", getTaskOpts);
        fastify.post("/task", postTaskOpts);
        fastify.delete("/task/:id", deleteTaskOpts);
        fastify.put("/task/:id", putTaskOpts);
    });
}
function getAllTasks(req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma_1.default.task.findMany({
            orderBy: {
                position: "asc",
            },
        });
        reply
            .code(200)
            .header("Content-Type", "application/json; charset=utf-8")
            .send(res);
    });
}
function getTask(req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const task = yield prisma_1.default.task.findUnique({
            where: {
                id: req.params.id,
            },
        });
        reply
            .code(200)
            .header("Content-Type", "application/json; charset=utf-8")
            .send(task);
    });
}
function createTask(req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, description, categoryId, position } = req.body;
        const post = yield prisma_1.default.task.create({
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
    });
}
function deleteTask(req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const deletedTask = yield prisma_1.default.task.delete({
            where: {
                id,
            },
        });
        reply
            .code(200)
            .header("Content-Type", "application/json; charset=utf-8")
            .send(deletedTask);
    });
}
function updateTask(req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, name, description, categoryId, position } = req.body;
        const modifiedTask = yield prisma_1.default.task.update({
            where: { id },
            data: { name, description, categoryId, position },
        });
        reply
            .code(200)
            .header("Content-Type", "application/json; charset=utf-8")
            .send(modifiedTask);
    });
}

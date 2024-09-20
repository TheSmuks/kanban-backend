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
exports.CategoryRoutes = CategoryRoutes;
const prisma_1 = __importDefault(require("../utils/prisma"));
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
function CategoryRoutes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.get("/categories", getCategoriesOpts);
        fastify.get("/category/:id", getCategoryOpts);
        fastify.post("/category", postCategoryOpts);
        fastify.delete("/category/:id", deleteCategoryOpts);
        fastify.put("/category/:id", putCategoryOpts);
    });
}
function getAllCategories(req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma_1.default.category.findMany({
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
    });
}
function getCategory(req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const Category = yield prisma_1.default.category.findUnique({
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
    });
}
function createCategory(req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, color, position } = req.body;
        const post = yield prisma_1.default.category.create({
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
    });
}
function deleteCategory(req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const deletedCategory = yield prisma_1.default.category.delete({
            where: {
                id,
            },
        });
        reply
            .code(200)
            .header("Content-Type", "application/json; charset=utf-8")
            .send(deletedCategory);
    });
}
function updateCategory(req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, name, color, position } = req.body;
        const modifiedCategory = yield prisma_1.default.category.update({
            where: { id },
            data: { name, color, position },
        });
        reply
            .code(200)
            .header("Content-Type", "application/json; charset=utf-8")
            .send(modifiedCategory);
    });
}

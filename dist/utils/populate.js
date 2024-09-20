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
exports.populateDB = populateDB;
const prisma_1 = __importDefault(require("./prisma"));
function populateDB() {
    return __awaiter(this, void 0, void 0, function* () {
        if ((yield prisma_1.default.category.count()) < 1) {
            const todoCategory = yield prisma_1.default.category.create({
                data: {
                    name: "Todo",
                    color: "#BBBBBB",
                    position: 0,
                },
            });
            yield prisma_1.default.task.create({
                data: {
                    name: "Task 1",
                    description: "This is a sample task",
                    categoryId: todoCategory.id,
                    position: 0,
                },
            });
            yield prisma_1.default.category.create({
                data: {
                    name: "In progress",
                    color: "#FFBF00",
                    position: 1,
                },
            });
            yield prisma_1.default.category.create({
                data: {
                    name: "Completed",
                    color: "#228B22",
                    position: 2,
                },
            });
        }
    });
}

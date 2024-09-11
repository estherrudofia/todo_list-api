"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const tasksRouter_1 = __importDefault(require("./router/tasksRouter"));
const app = (0, express_1.default)();
// middlewares
app.use((0, morgan_1.default)("dev"));
// routers
app.use("/tasks", tasksRouter_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});

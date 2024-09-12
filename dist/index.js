"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const tasksRouter_1 = __importDefault(require("./router/tasksRouter"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config({ path: "./config.env" });
const app = (0, express_1.default)();
// middlewares
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json()); // To parse JSON request
// routers
app.use("/tasks", tasksRouter_1.default);
// MongoDB connection
const DB = (_a = process.env.DATABASE) === null || _a === void 0 ? void 0 : _a.replace("<DB_PASSWORD>", process.env.DB_PASSWORD || "");
// console.log("Database connection string:", DB);
if (!DB) {
    console.error("Database connection string is undefined. Please check your environment variables.");
    process.exit(1);
}
mongoose_1.default.connect(DB)
    .then(() => {
    console.log("DB Connected!");
})
    .catch((err) => {
    console.error("DB Connection Error:", err);
    process.exit(1);
});
const PORT = process.env.PORT || 3000;
let server;
mongoose_1.default.connection.once("open", () => {
    server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION! 💥 SHUTTING DOWN...");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION! 💥 Shutting Down...");
    server.close(() => {
        process.exit(1);
    });
});

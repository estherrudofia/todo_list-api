import express, { Application } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import morgan from "morgan";
import tasksRouter from "./router/tasksRouter";
import dotenv from "dotenv";
import { Server } from "http";

// Load environment variables
dotenv.config({ path: "./config.env" });

const app: Application = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json()); // To parse JSON request

// routers
app.use("/tasks", tasksRouter);

// MongoDB connection
const DB = process.env.DATABASE?.replace(
  "<DB_PASSWORD>",
  process.env.DB_PASSWORD || ""
);

// console.log("Database connection string:", DB);

if (!DB) {
  console.error("Database connection string is undefined. Please check your environment variables.");
  process.exit(1);
}

mongoose.connect(DB)
  .then(() => {
    console.log("DB Connected!");
  })
  .catch((err) => {
    console.error("DB Connection Error:", err);
    process.exit(1);
  });

const PORT = process.env.PORT || 3000;
let server: Server;

mongoose.connection.once("open", () => {
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

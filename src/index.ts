import express from "express";
import morgan from "morgan";
import tasksRouter from "./router/tasksRouter";

const app = express();

// middlewares
app.use(morgan("dev"));

// routers
app.use("/tasks", tasksRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

import { Router } from "express";
import { getAllTasks, getTask, createTask, updateTask, deleteTask } from "../controllers/taskController";

const router = Router();

router.route("/")
  .get(getAllTasks)
  .post(createTask);

router.route("/:id")
  .get(getTask)
  .patch(updateTask)
  .delete(deleteTask);

export default router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
const router = (0, express_1.Router)();
router.route("/")
    .get(taskController_1.getAllTasks)
    .post(taskController_1.createTask);
router.route("/:id")
    .get(taskController_1.getTask)
    .patch(taskController_1.updateTask)
    .delete(taskController_1.deleteTask);
exports.default = router;

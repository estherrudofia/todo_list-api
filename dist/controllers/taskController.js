"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTask = exports.getAllTasks = void 0;
const taskModel_1 = __importDefault(require("../models/taskModel"));
// Get all tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await taskModel_1.default.find();
        return res.status(200).json({
            status: "success",
            data: {
                tasks,
            },
        });
    }
    catch (error) {
        console.error('Error fetching tasks:', error);
        return res.status(500).json({
            status: "error",
            message: "Failed to retrieve tasks",
        });
    }
};
exports.getAllTasks = getAllTasks;
// Get a single task by ID
const getTask = async (req, res) => {
    try {
        const task = await taskModel_1.default.findById(req.params.id);
        if (!task) {
            return res.status(404).json({
                status: "fail",
                message: "Task not found",
            });
        }
        return res.status(200).json({
            status: "success",
            data: {
                task,
            },
        });
    }
    catch (error) {
        console.error('Error fetching task:', error);
        return res.status(500).json({
            status: "error",
            message: "Failed to retrieve task",
        });
    }
};
exports.getTask = getTask;
// Create a new task
const createTask = async (req, res) => {
    try {
        const newTask = await taskModel_1.default.create(req.body);
        return res.status(201).json({
            status: "success",
            data: {
                task: newTask,
            },
        });
    }
    catch (error) {
        console.error('Error creating task:', error);
        return res.status(500).json({
            status: "error",
            message: "Failed to create task",
        });
    }
};
exports.createTask = createTask;
// Update an existing task
const updateTask = async (req, res) => {
    try {
        const updatedTask = await taskModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedTask) {
            return res.status(404).json({
                status: "fail",
                message: "Task not found",
            });
        }
        return res.status(200).json({
            status: "success",
            data: {
                task: updatedTask,
            },
        });
    }
    catch (error) {
        console.error('Error updating task:', error);
        return res.status(500).json({
            status: "error",
            message: "Failed to update task",
        });
    }
};
exports.updateTask = updateTask;
// Delete a task by ID
const deleteTask = async (req, res) => {
    try {
        const deletedTask = await taskModel_1.default.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({
                status: "fail",
                message: "Task not found",
            });
        }
        return res.status(204).json({
            status: "success",
            data: null,
        });
    }
    catch (error) {
        console.error('Error deleting task:', error);
        return res.status(500).json({
            status: "error",
            message: "Failed to delete task",
        });
    }
};
exports.deleteTask = deleteTask;

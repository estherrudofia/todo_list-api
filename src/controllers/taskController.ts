import { Request, Response } from "express";
import TaskModel, { ITask } from "../models/taskModel";

// Get all tasks
export const getAllTasks = async (req: Request, res: Response): Promise<Response> => {
  try {
    const tasks: ITask[] = await TaskModel.find();
    return res.status(200).json({
      status: "success",
      data: {
        tasks,
      },
    });
  } catch (error) {
    console.error('Error fetching tasks:', error); 
    return res.status(500).json({
      status: "error",
      message: "Failed to retrieve tasks",
    });
  }
};

// Get a single task by ID
export const getTask = async (req: Request, res: Response): Promise<Response> => {
  try {
    const task: ITask | null = await TaskModel.findById(req.params.id);
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
  } catch (error) {
    console.error('Error fetching task:', error); 
    return res.status(500).json({
      status: "error",
      message: "Failed to retrieve task",
    });
  }
};

// Create a new task
export const createTask = async (req: Request, res: Response): Promise<Response> => {
  try {
    const newTask: ITask = await TaskModel.create(req.body);
    return res.status(201).json({
      status: "success",
      data: {
        task: newTask,
      },
    });
  } catch (error) {
    console.error('Error creating task:', error); 
    return res.status(500).json({
      status: "error",
      message: "Failed to create task",
    });
  }
};

// Update an existing task
export const updateTask = async (req: Request, res: Response): Promise<Response> => {
  try {
    const updatedTask: ITask | null = await TaskModel.findByIdAndUpdate(req.params.id, req.body, {
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
  } catch (error) {
    console.error('Error updating task:', error); 
    return res.status(500).json({
      status: "error",
      message: "Failed to update task",
    });
  }
};

// Delete a task by ID
export const deleteTask = async (req: Request, res: Response): Promise<Response> => {
  try {
    const deletedTask: ITask | null = await TaskModel.findByIdAndDelete(req.params.id);

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
  } catch (error) {
    console.error('Error deleting task:', error); 
    return res.status(500).json({
      status: "error",
      message: "Failed to delete task",
    });
  }
};

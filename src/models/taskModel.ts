import mongoose, { Document, Schema, Query } from "mongoose";
import slugify from "slugify";

// Define the Task interface
export interface ITask extends Document {
  title: string;
  slug: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
  priority: "low" | "medium" | "high";
  createdAt: Date;
  updatedAt: Date;
}

// Define the Mongoose Schema for Task
const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, "A task must have a title"],
      trim: true,
      maxlength: [100, "A task title must have less or equal to 100 characters"],
    },
    slug: {
      type: String,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "A task description must have less or equal to 500 characters"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    dueDate: Date,
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Document Middleware: runs before saving the document
taskSchema.pre<ITask>("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  this.updatedAt = new Date();
  next();
});

// Query Middleware: exclude completed tasks by default
taskSchema.pre<Query<ITask[], ITask>>(/^find/, function (next) {
  this.where({ completed: { $ne: true } }); // Use `where` instead of `find`
  next();
});

// Create the Task Model using the schema and interface
const TaskModel = mongoose.model<ITask>("Task", taskSchema);

export default TaskModel;

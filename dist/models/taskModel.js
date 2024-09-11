"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const slugify_1 = __importDefault(require("slugify"));
// Define the Mongoose Schema for Task
const taskSchema = new mongoose_1.Schema({
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
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
// Document Middleware: runs before saving the document
taskSchema.pre("save", function (next) {
    this.slug = (0, slugify_1.default)(this.title, { lower: true });
    this.updatedAt = new Date();
    next();
});
// Query Middleware: exclude completed tasks by default
taskSchema.pre(/^find/, function (next) {
    this.where({ completed: { $ne: true } }); // Use `where` instead of `find`
    next();
});
// Create the Task Model using the schema and interface
const TaskModel = mongoose_1.default.model("Task", taskSchema);
exports.default = TaskModel;

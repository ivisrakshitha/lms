// models/Assignment.js
const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  submission: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["submitted", "graded", "late"],
    default: "submitted",
  },
  grade: {
    type: Number,
    min: 0,
  },
  feedback: {
    type: String,
  },
  gradedAt: {
    type: Date,
  },
});

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  points: {
    type: Number,
    required: true,
    min: 1,
  },
  instructions: {
    type: String,
    required: true,
  },
  submissionType: {
    type: String,
    enum: ["text", "file", "link"],
    required: true,
  },
  resources: {
    type: String,
    default: "",
  },
  submissions: [submissionSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
assignmentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Assignment", assignmentSchema);

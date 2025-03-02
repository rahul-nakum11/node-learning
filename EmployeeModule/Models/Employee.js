const mongoose = require("mongoose");

// create schema
const empSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    job_title: { type: String, required: true },
  },
  { timestamps: true }
);

// Create model
const Employee = mongoose.model("employee", empSchema);

module.exports = Employee;

const mongoose = require("mongoose");

// create schema
const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    job_title: { type: String },
    salary: { type: String },
    company_name: { type: String },
  },
  { timestamps: true }
);

// Create model
const User = mongoose.model("user", userSchema);

module.exports = { User };

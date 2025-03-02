const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const app = express();
const port = 8000;

//connect mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/demo_with_mango")
  .then(() => console.log("Database Connected!"))
  .catch((err) => console.log("Database Connection Error", err));

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
const User = mongoose.model("users", userSchema);

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const log = `${Date.now()} ${req.ip} ${req.method} ${req.path}\n`;
  fs.appendFile("./logger.txt", log, (err) => {
    if (err) return;
    next();
  });
});

app.get("/", async (req, res) => {
  res.send("Hello Express!");
});

app.get("/api/users", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

app.post("/api/users/", async (req, res) => {
  const user = await User.create({ ...req.body });

  res.status(201).json({ status: "scuccess", data: user });
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ status: "error", msg: "User not found!" });
    }
    res.json(user);
  })
  .patch(async (req, res) => {
    const userId = req.params.id;
    const user = await User.findByIdAndUpdate(userId, { ...req.body });
    res.json({ status: "scuccess" });
  })
  .delete(async (req, res) => {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.json({ status: "scuccess", message: "user deleted!" });
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

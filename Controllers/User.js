const { User } = require("../Models/User");

async function handleGetAllUsers(req, res) {
  const allUsers = await User.find({});
  return res.json(allUsers);
}

async function handleCreateUser(req, res) {
  const user = await User.create({ ...req.body });
  res.status(201).json({ status: "scuccess", data: user });
}

async function handleGetUser(req, res) {
  const user = await User.findById(req.params.id);
  return res.json(user);
}

async function handleUpdateUser(req, res) {
  const userId = req.params.id;
  const user = await User.findByIdAndUpdate(userId, { ...req.body });
  res.json({ status: "scuccess" });
}

async function handleDeleteUser(req, res) {
  const userId = req.params.id;
  await User.findByIdAndDelete(userId);
  res.json({ status: "scuccess", message: "user deleted!" });
}

module.exports = {
  handleGetAllUsers,
  handleCreateUser,
  handleGetUser,
  handleUpdateUser,
  handleDeleteUser,
};

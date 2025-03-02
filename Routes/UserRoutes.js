const express = require("express");
const {
  handleGetAllUsers,
  handleCreateUser,
  handleGetUser,
  handleUpdateUser,
  handleDeleteUser,
} = require("../Controllers/User");
const UserRoutes = express.Router();

UserRoutes.route("/").get(handleGetAllUsers).post(handleCreateUser);

UserRoutes.route("/:id")
  .get(handleGetUser)
  .patch(handleUpdateUser)
  .delete(handleDeleteUser);

module.exports = { UserRoutes };

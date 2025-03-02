const express = require("express");
const {
  handleGetAllEmployees,
  handleEmployeeSignupForm,
  handleEmployeeSigninForm,
  handleGetEmployee,
  handleUpdateEmployee,
  handleDeleteEmployee,
  handleEmployeeSignup,
  handleEmployeeSignin,
} = require("./Controllers/Employee");
const EmployeeRoutes = express.Router();

EmployeeRoutes.route("/").get(handleGetAllEmployees);
EmployeeRoutes.route("/signup")
  .get(handleEmployeeSignupForm)
  .post(handleEmployeeSignup);
EmployeeRoutes.route("/signin")
  .get(handleEmployeeSigninForm)
  .post(handleEmployeeSignin);

EmployeeRoutes.route("/:id")
  .get(handleGetEmployee)
  .patch(handleUpdateEmployee)
  .delete(handleDeleteEmployee);

module.exports = EmployeeRoutes;

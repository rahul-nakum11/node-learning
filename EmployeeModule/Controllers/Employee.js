const Employee = require("../Models/Employee");
const { v4: uuidv4 } = require("uuid");
const { setEmployee } = require("../../Services/EmpAuthService");

async function handleGetAllEmployees(req, res) {
  const allEmployees = await Employee.find({});
  return res.render("EmpDashboard", { allEmployees });
}

function handleEmployeeSignupForm(req, res) {
  return res.render("signup");
}

function handleEmployeeSigninForm(req, res) {
  return res.render("signin");
}

async function handleEmployeeSignup(req, res) {
  const employee = await Employee.create({ ...req.body });
  return res.redirect("/employees");
}

async function handleEmployeeSignin(req, res) {
  const employee = await Employee.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (!employee) {
    res.redirect("/employees/signin", {
      error: "Email or Password is incorrect!",
    });
  }
  const empSessionId = uuidv4();
  setEmployee(empSessionId, employee);
  res.cookie("empUid", empSessionId);
  return res.redirect("/url-short");
}

async function handleGetEmployee(req, res) {
  const employee = await Employee.findById(req.params.id);
  return res.json(employee);
}

async function handleUpdateEmployee(req, res) {
  const empId = req.params.id;
  const employee = await Employee.findByIdAndUpdate(empId, { ...req.body });
  return res.json({ status: "scuccess" });
}

async function handleDeleteEmployee(req, res) {
  const empId = req.params.id;
  await Employee.findByIdAndDelete(empId);
  return res.json({ status: "scuccess", message: "Employee deleted!" });
}

module.exports = {
  handleGetAllEmployees,
  handleEmployeeSignupForm,
  handleEmployeeSigninForm,
  handleGetEmployee,
  handleUpdateEmployee,
  handleDeleteEmployee,
  handleEmployeeSignup,
  handleEmployeeSignin,
};

const { getEmployee } = require("../Services/EmpAuthService");
async function restrictToLoggedInEmployeeOnly(req, res, next) {
  const empUid = res.cookies?.empUid;
  if (!empUid) return res.redirect("/employees/signin");

  const employee = getEmployee(empUid);
  if (!employee) return res.redirect("/employees/signin");

  req.employee = employee;
  next();
}

module.exports = { restrictToLoggedInEmployeeOnly };

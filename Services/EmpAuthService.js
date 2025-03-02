const sessionIdToEmployeeMap = new Map();

function setEmployee(id, employee) {
  sessionIdToEmployeeMap.set(id, employee);
}

function getEmployee(id) {
  return sessionIdToEmployeeMap.get(id, employee);
}

module.exports = { setEmployee, getEmployee };

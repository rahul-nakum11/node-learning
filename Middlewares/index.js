const fs = require("fs");

function logRequest(fileName) {
  return (req, res, next) => {
    const log = `${Date.now()} ${req.ip} ${req.method} ${req.path}\n`;
    fs.appendFile(fileName, log, (err) => {
      if (err) return;
      next();
    });
  };
}

module.exports = { logRequest };

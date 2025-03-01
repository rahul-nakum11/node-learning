const fs = require("fs");
const http = require("http");

const myServer = http.createServer((req, res) => {
  const log = `${Date.now()} : ${req.url} New requiest received\n`;
  fs.appendFile("logger.txt", log, (err, data) => {
    switch (req.url) {
      case "/":
        res.end("Home Page");
        break;
      case "/about":
        res.end("About Page");
        break;
      case "/contact":
        res.end("Contact Page");
        break;
      default:
        res.end("404 Not FOund");
        break;
    }
  });
});

myServer.listen(8000, () => console.log("server started!"));

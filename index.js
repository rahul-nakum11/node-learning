const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectMongoDb } = require("./dbConnection");
const UserRoutes = require("./UserModule/UserRoutes");
const UrlShortnerRoutes = require("./UrlShortModule/UrlShortnerRoutes");
const EmployeeRoutes = require("./EmployeeModule/EmployeeRoutes");
const { restrictToLoggedInEmployeeOnly } = require("./Middlewares/AuthEmp");
const { logRequest } = require("./Middlewares");

const app = express();
const port = 8000;

//connect mongodb
connectMongoDb("mongodb://127.0.0.1:27017/demo_with_mango")
  .then(() => console.log("Database Connected!"))
  .catch((err) => console.log("Database Connection Error", err));

// middleware to parse form data
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logRequest("logger.txt")); // middleware to log incomming requests

app.set("view engine", "ejs"); // set view engine
// Set multiple view directories
app.set("views", [
  path.join(__dirname, "UserModule", "views"),
  path.join(__dirname, "UrlShortModule", "views"),
  path.join(__dirname, "EmployeeModule", "views"),
]);

app.get("/", (req, res) => {
  res.send("Hello Express!");
});

// User Routers
app.use("/api/users", UserRoutes);

// URL shortner Routers
app.use("/url-short", restrictToLoggedInEmployeeOnly, UrlShortnerRoutes);

// Employees Routers
app.use("/employees", EmployeeRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

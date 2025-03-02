const express = require("express");
const { connectMongoDb } = require("./dbConnection");
const UserRoutes = require("./UserModule/UserRoutes");
const UrlShortnerRoutes = require("./UrlShortModule/UrlShortnerRoutes");

const { logRequest } = require("./Middlewares");
const app = express();
const port = 8000;

//connect mongodb
connectMongoDb("mongodb://127.0.0.1:27017/demo_with_mango")
  .then(() => console.log("Database Connected!"))
  .catch((err) => console.log("Database Connection Error", err));

// middleware to parse form data
app.use(express.urlencoded({ extended: false }));
app.use(logRequest("logger.txt")); // middleware to log incomming requests

app.get("/", async (req, res) => {
  res.send("Hello Express!");
});

// User Routers
app.use("/api/users", UserRoutes);

// URL shortner Routers
app.use("/url-short", UrlShortnerRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

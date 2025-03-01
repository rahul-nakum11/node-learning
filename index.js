const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const log = `${Date.now()} ${req.ip} ${req.method} ${req.path}\n`;
  fs.appendFile("./logger.txt", log, (err) => {
    if (err) return;
    next();
  });
});

app.get("/", (req, res) => {
  res.send("Hello Express!");
});

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.post("/api/users/", (req, res) => {
  users.push({ ...req.body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
    if (err) res.json({ status: err, id: null });
    res.json({ status: "scuccess", id: users.length });
  });
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const userId = Number(req.params.id);
    const user = users.find(({ id }) => id === userId);
    console.log(user, userId);

    if (user === undefined) {
      res.json({ status: "error", message: "user not found" });
      return;
    }
    res.json(user);
  })
  .patch((req, res) => {
    const userId = Number(req.params.id);
    const userIndex = users.findIndex(({ id }) => id === userId);
    if (userIndex === -1) {
      res.json({ status: "error", message: "user not found" });
      return;
    }
    users[userIndex] = { ...users[userIndex], ...req.body };
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
      if (err) res.json({ status: err, id: userId });
      res.json({ status: "scuccess", id: userId });
    });
  })
  .delete((req, res) => {
    const userId = Number(req.params.id);
    if (!userId) {
      res.json({ status: "error", message: "user id required" });
      return;
    }
    let fltUsers = users.filter(({ id }) => id !== userId);
    fs.writeFile(
      "./MOCK_DATA.json",
      JSON.stringify(fltUsers, null, 2),
      (err) => {
        if (err) res.json({ status: err, message: "user not deleted" });
        res.json({ status: "scuccess", message: "user deleted!" });
      }
    );
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

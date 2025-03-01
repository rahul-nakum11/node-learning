const fs = require("fs");

//Syncronus file creation
fs.writeFileSync("./test.txt", "Hey Rahul file is created. ");

//Async file creation
fs.writeFile(
  "./test.txt",
  "This file is created by async file creation",
  (err) => {
    console.log;
  }
);

//Read file Sync
const readResult = fs.readFileSync("./readfile.txt", "utf-8");
console.log(readResult);

//Read file Async
fs.readFileSync("./readfile.txt", "utf-8", (err, result) => {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Result", result);
  }
});

//Append file Sync
fs.appendFileSync("./test.txt", new Date().getDate().toLocaleString());

//Read file Async
fs.appendFile("./test.txt", "Append data using async append file", (err) =>
  console.log("Error", err)
);

fs.copyFile("./test.txt", "./copy.txt", (err) => console.log); //copy file
fs.unlinkSync("./readFile.txt"); //Delete file
fs.mkdirSync("demo-files"); //Create folder
fs.mkdirSync("demo/a/b", { recursive: true }); //create recursive folders

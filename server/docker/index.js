const { appendFile } = require("fs");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// console.log("Hello World!");
// var input = [];

app.post("/codeToDockerTemp", (req, res) => {
  res.json();
  console.log(req.body);
  console.log(req.body.Code);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

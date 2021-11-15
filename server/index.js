const express = require("express");
const app = express();
const port = 4000;

app.get("/", (req, res) => {});

app.get("/code", (req, res) => {
  res.json();
});

app.post("/sendCode", (req, res) => {
  console.log(req.body);
  const newCode = res;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

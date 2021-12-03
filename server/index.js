const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {});

app.get("/code", (req, res) => {
  res.json();
});

app.post("/sendCode", (req, res) => {
  const language = req.body;
  const code = req.body.Code;
  console.log(code);
  console.log(language);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

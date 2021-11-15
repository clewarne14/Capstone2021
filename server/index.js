const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/code", (req,res) => {
  res.json()
});

app.post("/sendCode/",(req,res) =>{
  console.log("Hello World");
  const newCode = res;

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

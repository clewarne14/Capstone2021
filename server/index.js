const express = require("express");
const cors = require("cors");
const { getDb } = require("./build/database");

require("dotenv").config();

const app = express();
const port = process.env.PORT;
const db = getDb(process.env.USER, process.env.PASSWORD, process.env.DATABASE);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {});

app.get("/code", (req, res) => {});

app.post("/sendCode", async (req, res) => {
  const { title, description, choices } = req.body;
  await db.query(
    `insert into test (choices, description, title) values ('${choices}', '${description}', '${title}')`
  );

  console.log(await db.query("select * from test"));

  console.log(title, description, choices);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

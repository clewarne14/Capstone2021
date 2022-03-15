const express = require("express");
const cors = require("cors");
const { getDb } = require("./build/database");

require("dotenv").config();

const app = express();
const {
  SERVER_PORT,
  USER,
  PASSWORD,
  DATABASE,
  CERT_LOCATION,
  HOST,
  DATABASE_PORT,
} = process.env;

const db = getDb(USER, PASSWORD, DATABASE, HOST, DATABASE_PORT);

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
});

app.listen(SERVER_PORT, () => {
  console.log(`Connected at http://localhost:${SERVER_PORT}`);
});

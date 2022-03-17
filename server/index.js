const express = require("express");
const cors = require("cors");
const { getDb } = require("./build/database");

require("dotenv").config();

const app = express();
const {
  SERVER_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  DATABASE_HOST,
  DATABASE_PORT,
} = process.env;

const db = getDb(
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  DATABASE_HOST,
  DATABASE_PORT
);

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

app.listen(SERVER_PORT, async () => {
  console.log(`Connected at http://localhost:${SERVER_PORT}`);
  try {
    await db.getConnection();
    console.log("Sucessfully connected to the database!");
  } catch (e) {
    console.error(e);
  }
});

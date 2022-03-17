const express = require("express");
const cors = require("cors");
const { getDb } = require("./build/database");
const { spawn, exec } = require("child_process");
const fs = require("fs");

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
app.post("/testCode", async (req, res) => {
  const { Language, Code } = req.body;
  console.log(Code);
  // var f = new File(
  //   [code],
  //   "/Users/clewarne/Capstone2021/docker/docker/Test2.txt"
  // );
  fs.writeFile(
    "/Users/clewarne/Capstone2021/server/docker/docker/Test2.txt",
    Code,
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
  exec(
    "docker run -e VERSION=1.1 -i --rm -p 9000:5000 code-create python /docker/Create.py < docker/docker/Test2.txt > docker/docker/output.txt"
  );
  return "Done";
});

app.listen(SERVER_PORT, async () => {
  console.log(`Connected at http://localhost:${SERVER_PORT}`);
  try {
    await db.getConnection();
    console.log("Sucessfully connected to the database");
  } catch (e) {
    console.error(e);
  }
});

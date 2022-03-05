const express = require("express");
const cors = require("cors");
const sqlite = require("./database");
const app = express();
const port = 4000;

const db = sqlite.default;
db.run("CREATE TABLE adrian (info TEXT)");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {});

app.get("/code", (req, res) => {
  console.log("in here");
  const records = [];
  const x = db.all("SELECT rowid AS id, info FROM adrian", (err, row) => {
    res.send(row);
    return row;
  });
});

app.post("/sendCode", (req, res) => {
  const language = req.body;
  const code = req.body.Code;
  console.log(code);
  console.log(language);

  db.serialize(() => {
    const stmt = db.prepare("INSERT INTO adrian VALUES (?)");

    stmt.run(code);

    stmt.finalize();
    res.send("success");
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

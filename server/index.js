const express = require('express');
const cors = require('cors');
const { getDb } = require('./build/database');
const { exec, ChildProcess, execSync } = require('child_process');
const fs = require('fs');

require('dotenv').config();

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

app.get('/', (req, res) => {});

app.get('/code', (req, res) => {});

app.get('/tags', async (req, res) => {
  const tags = await db.query('select * from tags');
  res.send(tags);
});

app.post('/multiple-choice', async (req, res) => {
  const { title, description, choices, tags } = req.body;

  const answer = choices.find((choice) => choice.active);
  const parsedChoices = choices.map((choice) => choice.text).join(', ');
  const parsedTags = tags.join(', ');
  const currentDatetime = new Date();
  const formattedDate = currentDatetime
    .toISOString()
    .split('T')
    .join(' ')
    .substring(0, 19);

  try {
    await db.query(
      `insert into multipleChoice (choices, problemDescription, title, tags, dateCreated, answer) values ('${parsedChoices}', '${description}', '${title}', '${parsedTags}', '${formattedDate}', '${answer.text}')`
    );
  } catch (e) {
    console.log('failed');
    throw e;
  }
});

app.post('/testCode', async (req, res) => {
  const { Language, Code } = req.body;

  let c = `def fib(inp):
    if inp==3:
      return "0 1 1"
    if inp==4:
      return "0 1 1 2"`;

  let Test = `
import execFile

def test1():
    if execFile.fib(3)== "0 1 1":
        return True
    else:
        return False
def test2():
    if execFile.fib(4)=="0 1 1 2":
        return True
    else:
        return False

if __name__ == "__main__":
    if test1() and test2():
        print("TRUE")
    else:
        print("FALSE")`;
  let testJSON =
    `{ "TESTS" : [` +
    `{ "name": "Fibonacci 1", "pass": "false", "methodCall": "fib(3)", "expected": "0 1 1", "actual": "none", "message":"none" },` +
    `{ "name": "Fibonacci 2", "pass": "false", "methodCall": "fib(4)", "expected": "0 1 1 2", "actual": "none", "message":"none" } ]}`;
  const command =
    "docker run -e VERSION=1.1 -i --rm -p 9000:5000 code-create -UserCode '" +
    c +
    "' -TestJSON '" +
    testJSON +
    "'";
  //Execute docker container and run code
  var s = '';
  const callDocker = async function () {
    var output = execSync(command, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
      s = stdout;
      return s;
    }).toString();
    return output;
  };
  // const readFile = async function () {
  //   fs.readFile('output.txt', 'utf-8', (output, err) => {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //     s = output;
  //     console.log(output);
  //   });
  // };
  //callDocker()
  const ret = await callDocker();
  console.log(ret);
  //let output = JSON.parse(ret)
  res.send(ret);
  // console.log(s);
  // res.send(s);
});

app.listen(SERVER_PORT, async () => {
  console.log(`Connected at http://localhost:${SERVER_PORT}`);
  try {
    await db.getConnection();
    console.log('Sucessfully connected to the database!');
  } catch (e) {
    console.error(e);
  }
});

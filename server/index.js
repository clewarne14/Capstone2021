import express from 'express';
import cors from 'cors';
import { getDb } from '../server/build/database.js';
import exec from 'child_process';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const {
  SERVER_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  DATABASE_HOST,
  DATABASE_PORT,
  AUTH0_DOMAIN,
  AUTH0_SCOPE,
  AUTH0_CLIENT_ID,
  AUTH0_AUDIENCE,
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
  const { title, description, choices, tags, user } = req.body;

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
      `insert into multipleChoice (choices, problemDescription, title, tags, dateCreated, answer, creatorName, likes, problemType) values ('${parsedChoices}', '${description}', '${title}', '${parsedTags}', '${formattedDate}', '${answer.text}', '${user.nickname}', 0, 'multiple choice')`
    );
    res.send({
      success: true,
      message: `${title} successfully created`,
    });
  } catch (e) {
    res.send({ success: false, message: e.text });
    throw e;
  }
});

app.get('/multiple-choice', async (req, res) => {
  try {
    const data = await db.query('select * from multipleChoice');
    const formattedData = data.map((item) => ({
      ...item,
      tags: item.tags.split(','),
      choices: item.choices.split(','),
    }));
    res.send(formattedData);
  } catch (e) {
    throw e;
  }
});

app.post('/createUser', (req, res) => {
  console.log(req.body);
});

app.post('/testCode', async (req, res) => {
  const { Language, Code } = req.body;

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
  const command =
    "docker run -e VERSION=1.1 -i --rm -p 9000:5000 code-create python '" +
    Code +
    "' '" +
    Test +
    "' > output.txt";
  //Execute docker container and run code
  exec(command);
  return 'Done';
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

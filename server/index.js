const express = require('express');
const cors = require('cors');
const { getDb } = require('./build/database');
const { exec } = require('child_process');
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
    throw e;
  }
});

app.post('/testCode', async (req, res) => {
  const { Language, Code } = req.body;
  console.log(Code);
  //Create new file with code as text
  fs.writeFile(
    '/Users/clewarne/Capstone2021/server/docker/docker/Test2.txt',
    Code,
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
  //Execute docker container and run code
  exec(
    'docker run -e VERSION=1.1 -i --rm -p 9000:5000 code-create python /docker/Create.py < docker/docker/Test2.txt > docker/docker/output.txt'
  );
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

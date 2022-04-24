import express from 'express';
import cors from 'cors';
import { getDb } from './build/database.js';
import { execSync } from 'child_process';
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

app.get('/', (req, res) => {res.send("Is this working")});

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
      `insert into multipleChoice (choices, problemDescription, title, tags, dateCreated, answer, creatorName, likes, problemType) values ('${parsedChoices}', '${description}', '${title}', '${parsedTags}', '${formattedDate}', '${answer.text}', '${user.nickname}', 0, 'multiple-choice')`
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

app.post('/algorithmic', async (req, res) => {
  const { title, description, tags, user, startingCode, testSuite, language } =
    req.body;

  const parsedTags = tags.join(', ');
  const currentDatetime = new Date();
  const formattedDate = currentDatetime
    .toISOString()
    .split('T')
    .join(' ')
    .substring(0, 19);

  try {
    await db.query(
      `insert into algorithmic (title, tags, dateCreated, problemDescription, creatorName, likes, problemType, startingCode, testSuite, language) values ('${title}', '${parsedTags}', '${formattedDate}', '${description}', '${user}', 0, 'algorithmic', '${startingCode}', '${testSuite}', '${language}')`
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

app.get('/multiple-choice/:problemId', async (req, res) => {
  const { problemId } = req.params;
  try {
    const problem = await db.query(
      `select * from multipleChoice where problemId=${problemId}`
    );
    const formattedProblem = problem.map((item) => ({
      ...item,
      tags: item.tags.split(','),
      choices: item.choices.split(','),
    }));
    res.send(formattedProblem[0]);
  } catch (e) {
    res.send({ message: e.text, success: false });
  }
});

app.get('/algorithmic', async (req, res) => {
  try {
    const data = await db.query('select * from algorithmic');
    const formattedData = data.map((item) => ({
      ...item,
      tags: item.tags.split(','),
    }));
    res.send(formattedData);
  } catch (e) {
    throw e;
  }
});

// Gets the most recent problems
app.get('/problems', async (req, res) => {
  const algorithmic = await db.query('select * from algorithmic');
  const multipleChoice = await db.query('select * from multipleChoice');

  const algorithmicProblems = algorithmic.map((problem) => ({
    title: problem.title,
    tags: problem.tags.split(','),
    dateCreated: problem.dateCreated,
    problemDescription: problem.problemDescription,
    problemId: problem.problemId,
    creatorName: problem.creatorName,
    likes: problem.likes,
    problemType: problem.problemType,
  }));

  const multipleChoiceProblems = multipleChoice.map((problem) => ({
    title: problem.title,
    tags: problem.tags.split(','),
    dateCreated: problem.dateCreated,
    problemDescription: problem.problemDescription,
    problemId: problem.problemId,
    creatorName: problem.creatorName,
    likes: problem.likes,
    problemType: problem.problemType,
  }));

  const problems = [...multipleChoiceProblems, ...algorithmicProblems];

  res.send(
    problems.sort(
      (problem1, problem2) => problem2.dateCreated - problem1.dateCreated
    )
  );
});

app.get('/algorithmic/:problemId', async (req, res) => {
  const { problemId } = req.params;
  try {
    const problem = await db.query(
      `select * from algorithmic where problemId=${problemId}`
    );
    const formattedProblem = problem.map((item) => ({
      ...item,
      tags: item.tags.split(','),
    }));
    console.log(formattedProblem);
    res.send(formattedProblem[0]);
  } catch (e) {
    res.send({ message: e.text, success: false });
  }
});

app.post('/createUser', (req, res) => {
  console.log(req.body);
});

app.post('/testCode', async (req, res) => {
  const { Language, Code } = req.body;
  console.log(Code);
  let c = `def fib(inp):
    if inp==3:
      return "0 1 2"
    if inp==4:
      return "0 1 1 3"`;

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
    Code +
    "' -TestJSON '" +
    testJSON +
    "'";
  console.log(command);
  //Execute docker container and run code
  var s = '';
  const callDocker = async function () {
    var output = execSync(command, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
      console.log('hello');
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
  let output = JSON.parse(ret);
  let failedTests = '';
  for (let i = 0; i < output['TESTS'].length; i++) {
    if (output['TESTS'][i]['pass'] != 'True') {
      if (failedTests == '') {
        failedTests +=
          'Your code did not pass the tests!\nTest name: ' +
          output['TESTS'][i]['name'] +
          '\nMethod call: ' +
          output['TESTS'][i]['methodCall'] +
          '\nExpected: ' +
          output['TESTS'][i]['expected'] +
          '\nActual: ' +
          output['TESTS'][i]['actual'];
        if (output['TESTS'][i]['message'] != 'none') {
          failedTests += '\n' + output['TESTS'][i]['message'];
        }
      }
    }
  }
  console.log(failedTests);
  res.send(failedTests);
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

export default app;

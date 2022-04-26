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

const updateProblemsCreated = async (problemType, username, problemId) => {
  const queryProblemsCreated = await db.query(
    `select problemsCreated from user where username='${username}'`
  );

  const problemsCreated = queryProblemsCreated[0];
  const updatedProblemsCreated =
    problemsCreated.problemsCreated + ',' + problemType + '-' + (problemId + 1);

  // Update this user's problems created
  await db.query(
    `update user set problemsCreated = '${updatedProblemsCreated}' where username='${username}'`
  );
};

const getProblemsRecent = async () => {
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

  const sortedProblems = problems.sort(
    (problem1, problem2) => problem2.dateCreated - problem1.dateCreated
  );

  return sortedProblems;
};

const getUsernameByEmail = async (email) => {
  const res = await db.query(
    `select username from user where email='${email}'`
  );
  return res[0].username;
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Is this working');
});

app.get('/code', (req, res) => {});

app.get('/tags', async (req, res) => {
  const tags = await db.query('select * from tags');
  res.send(tags);
});

app.post('/multiple-choice', async (req, res) => {
  const { title, description, choices, tags, email } = req.body;

  const queriedUserByEmail = await db.query(
    `select * from user where email = '${email}'`
  );

  const foundUserByEmail = queriedUserByEmail[0].username;

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
    const queriedProblemId = await db.query(
      `select max(problemId) as problemId from multipleChoice`
    );

    const problemId = queriedProblemId[0].problemId;

    await db.query(
      `insert into multipleChoice (choices, problemDescription, title, tags, dateCreated, answer, creatorName, likes, problemType) values ('${parsedChoices}', '${description}', '${title}', '${parsedTags}', '${formattedDate}', '${answer.text}', '${foundUserByEmail}', 0, 'multiple-choice')`
    );

    updateProblemsCreated('multipleChoice', foundUserByEmail, problemId);

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
  const { title, description, tags, email, startingCode, testSuite, language } =
    req.body;

  const queriedUserByEmail = await db.query(
    `select * from user where email = '${email}'`
  );

  const foundUserByEmail = queriedUserByEmail[0].username;

  const parsedTags = tags.join(', ');
  const currentDatetime = new Date();
  const formattedDate = currentDatetime
    .toISOString()
    .split('T')
    .join(' ')
    .substring(0, 19);

  try {
    const queriedProblemId = await db.query(
      `select max(problemId) as problemId from algorithmic`
    );

    const problemId = queriedProblemId[0].problemId;
    await db.query(
      `insert into algorithmic (title, tags, dateCreated, problemDescription, creatorName, likes, problemType, startingCode, testSuite, language) values ('${title}', '${parsedTags}', '${formattedDate}', '${description}', '${foundUserByEmail}', 0, 'algorithmic', '${startingCode}', '${testSuite}', '${language}')`
    );

    updateProblemsCreated('algorithmic', foundUserByEmail, problemId);

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

/**
 * Get user by email
 */
app.get('/user/email/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const username = await getUsernameByEmail(email);
    const user = await db.query(
      `select * from user where username='${username}'`
    );
    res.send(user[0]);
  } catch (e) {
    res.send({ message: e.text, success: false });
  }
});

/**
 * Get user by username
 */
app.get('/user/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const user = await db.query(`select * from user where username='${name}'`);
    res.send(user[0]);
  } catch (e) {
    res.send({ message: e.text, success: false });
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
  const sortedProblems = await getProblemsRecent();
  res.send(sortedProblems);
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
    res.send(formattedProblem[0]);
  } catch (e) {
    res.send({ message: e.text, success: false });
  }
});

app.get('/user/:name/problems', async (req, res) => {
  const { name } = req.params;

  const user = await db.query(
    `select problemsCreated, problemsSolved from user where username='${name}'`
  );

  const problems = user[0];

  const problemsCreated = problems.problemsCreated.split(',');
  const problemsSolved = problems.problemsSolved.split(',');

  const recentProblemsCreated = [];
  const recentProblemsSolved = [];

  for (let i = 0; i < 3; i++) {
    if (problemsCreated.length - i >= 0) {
      const aProblem = problemsCreated[problemsCreated.length - 1 - i];
      if (aProblem && aProblem.length !== 0)
        recentProblemsCreated.push(aProblem);
    }

    if (problemsSolved.length - i >= 0) {
      const aProblem = problemsSolved[problemsSolved.length - 1 - i];
      if (aProblem && aProblem.length !== 0)
        recentProblemsSolved.push(aProblem);
    }
  }

  /**
   * Helper function to a problem based on provided problemId and problem type
   * @param {*} problem problem type and problem id
   * @returns The problem matching this criteria
   */
  const getProblem = async (problem) => {
    let [problemType, problemId] = problem.split('-');
    if (problemType === 'multiple-choice') problemType = 'multipleChoice';

    const problemInfo = await db.query(
      `select likes, problemType, title from ${problemType} where problemId = ${problemId}`
    );

    return problemInfo[0];
  };

  const recentProblemsCreatedInfo = recentProblemsCreated.map(getProblem);

  const recentProblemsSolvedInfo = recentProblemsSolved.map(getProblem);

  res.send({
    problemsCreated: await Promise.all(recentProblemsCreatedInfo),
    problemsSolved: await Promise.all(recentProblemsSolvedInfo),
  });
});

app.post('/createUser', async (req, res) => {
  const { username, picture, email } = req.body;

  try {
    await db.query(
      `insert into user (username, profilePicture, lists, reputation, problemsCreated, problemsSolved, email, problemsLiked) values ('${username}', '${
        picture ? picture : ''
      }', ' ', 0, ' ', ' ', '${email}', ' ')`
    );
    res.send({
      message: `${username} was successfully created!`,
      success: true,
    });
  } catch (e) {
    res.send({ message: e.text, success: false });
  }
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

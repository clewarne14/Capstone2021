import express from 'express';
import cors from 'cors';
import { getDb } from '../server/build/database.js';
import { execSync } from 'child_process';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { strictEqual } from 'assert';

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

app.post('/createUser', (req, res) => {
  console.log(req.body);
});

// app.post('/testSubmitJSON', (req, res) => {
//   const Test = req.body;
//   let testSubmit = '';
//   let outputTest = null;
//   let outputJSON = null;
//   for (let i = 0; i < Test.length; i++) {
//     if (i > Test.length - 1) {
//       testSubmit += Test.charAt(i);
//       break;
//     }
//     if (
//       Test.charAt(i) == '"' ||
//       Test.charAt(i) == '\t' ||
//       Test.charAt(i) == '\n'
//     ) {
//       console.log('TEST');
//       if (Test.charAt(i) == '"') {
//         console.log('Test2');
//         testSubmit += '\\"';
//       } else if (Test.charAt(i) == '\t') {
//         testSubmit += '\\t';
//       } else if (Test.charAt(i) == '\n') {
//         testSubmit += '\\n';
//       }
//     } else {
//       testSubmit += Test.charAt(i);
//     }
//   }
//   try{
//     outputJSON = json.parse(testSubmit);
//     outputTest =
//   }
//   catch(Error){

//   }
// });

app.post('/testCode', async (req, res) => {
  const { Language, Code } = req.body;

  let codeSubmit = '';
  let testSubmit = '';
  let Test = `if __name__ == "__main__":\n\toutput = execFile.judgeCircle("UDUD")\n\tif output != True:\n\t\tprint('{ "TestName":"JudgeCircle 1", "MethodCall": "JudgeCircle(UDUD)", "ExpectedOutput": "True", "ActualOutput": "' + str(output) + '"}')\n\t\tsys.exit()\n\toutput = execFile.judgeCircle("UDLL")\n\tif output != False:\n\t\tprint('{ "TestName":"JudgeCircle 2", "MethodCall": "JudgeCircle(UDLL)", "ExpectedOutput": "False", "ActualOutput": "' + str(output) + '"}')\n\t\tsys.exit()`;
  for (let i = 0; i < Code.length; i++) {
    if (i > Code.length - 1) {
      codeSubmit += Code.charAt(i);
      break;
    }
    if (
      Code.charAt(i) == '"' ||
      Code.charAt(i) == '\t' ||
      Code.charAt(i) == '\n'
    ) {
      if (Code.charAt(i) == '"') {
        codeSubmit += '\\"';
      } else if (Code.charAt(i) == '\t') {
        codeSubmit += '\\t';
      } else if (Code.charAt(i) == '\n') {
        codeSubmit += '\\n';
      }
    } else {
      codeSubmit += Code.charAt(i);
    }
  }
  for (let i = 0; i < Test.length; i++) {
    if (i > Test.length - 1) {
      testSubmit += Test.charAt(i);
      break;
    }
    if (
      Test.charAt(i) == '"' ||
      Test.charAt(i) == '\t' ||
      Test.charAt(i) == '\n'
    ) {
      if (Test.charAt(i) == '"') {
        testSubmit += '\\"';
      } else if (Test.charAt(i) == '\t') {
        testSubmit += '\\t';
      } else if (Test.charAt(i) == '\n') {
        testSubmit += '\\n';
      }
    } else {
      testSubmit += Test.charAt(i);
    }
  }

  let jsonInp =
    `{ "TESTS": "` + testSubmit + `" , "UserCode": "` + codeSubmit + `\"}`;
  let jsonInpTemp = `{"TESTS": "if __name__ == \\\"__main__\\\":\\n\\t\\n\\toutput = execFile.fib(3)\\n\\tif output != \\\"0 1 1\\\":\\n\\t\\tprint('{ \\\"TestName\\\":\\\"Fibonacci 1\\\", \\\"MethodCall\\": \\\"fib(3)\\\", \\\"ExpectedOutput\\\": \\\"0 1 1\\\", \\\"ActualOutput\\\": \\\"' + output + '\\\"')\\n\\t\\tsys.exit()\\n\\toutput = execFile.fib(4)\\n\\tif output != \\\"0 1 1 2\\\":\\n\\t\\tprint('{ \\\"TestName\\\":  + \\\"Fibonacci 1\\\", \\\"MethodCall\\\": \\\"fib(3)\\\", \\\"ExpectedOutput\\\": \\\"0 1 1 2\\\", \\\"ActualOutput\\\": \\\"' + output + '\\\"}')\\n\\t\\tsys.exit()", "UserCode":"def fib(inp):\\n\\tif inp==3:\\n\\t\\treturn \\\"0 1 2\\\"\\n\\tif inp==4:\\n\\t\\treturn \\\"0 1 1 2\\\""}`;
  const command =
    'docker run -e VERSION=1.1 -i --rm -p 9000:5000 code-create-python ';
  //Execute docker container and run code
  var s = '';
  const callDocker = async function () {
    var output = execSync(command, { input: jsonInp }).toString();
    return output;
  };
  let ret = await callDocker();
  // console.log(ret);
  let output = null;
  if (ret.trim().length != 0) {
    try {
      output = JSON.parse(ret);
    } catch (e) {
      res.send(
        'The return value was not in a correct JSON format.\nThis is not a problem with your code but with the tests provided.\nPlease contact the creator of the problem.'
      );
    }
  } else {
    output = '';
  }
  let failedTests = '';

  //Creating the failedTests message to be output to the user
  if (ret.trim().length != 0) {
    try {
      failedTests +=
        'Your code did not pass the tests!\nTest name: ' +
        output['TestName'] +
        '\nMethod call: ' +
        output['MethodCall'] +
        '\nExpected: ' +
        output['ExpectedOutput'] +
        '\nActual: ' +
        output['ActualOutput'];
      if ('error' in output) {
        failedTests +=
          '\nThere was an error running your code.\nError: ' + output['error'];
      }
    } catch (e) {
      res.send(
        'The tests submitted by the problem creator were submitted in the wrong format.\nContact the test creator.'
      );
    }
  }
  if (failedTests == '') {
    failedTests = 'Congratulations! Your code passed all of the tests!';
  }
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

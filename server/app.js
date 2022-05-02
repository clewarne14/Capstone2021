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

// HELPER FUNCTIONS ----------------------------------------

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

const getFormattedProblems = (problems) => {
  const formattedProblems = problems.map((problem) => ({
    title: problem.title,
    tags: problem.tags.split(','),
    dateCreated: problem.dateCreated,
    problemDescription: problem.problemDescription,
    problemId: problem.problemId,
    creatorName: problem.creatorName,
    likes: problem.likes,
    problemType: problem.problemType,
  }));
  return formattedProblems;
};

const getAllProblems = async (createdBy, searchValue) => {
  const algorithmic = await db.query(
    `select * from algorithmic where creatorName like '%${createdBy}%' and title like '%${searchValue}%'`
  );
  const multipleChoice = await db.query(
    `select * from multipleChoice where creatorName like '%${createdBy}%' and title like '%${searchValue}%'`
  );

  const algorithmicProblems = getFormattedProblems(algorithmic);
  const multipleChoiceProblems = getFormattedProblems(multipleChoice);

  const problems = [...multipleChoiceProblems, ...algorithmicProblems];

  return problems;
};

const getUsernameByEmail = async (email) => {
  const res = await db.query(
    `select username from user where email='${email}'`
  );
  return res[0].username;
};

const sortValues = (values, sortByValue) => {
  // Sort all of the problems
  switch (sortByValue) {
    case 'Newest':
      values = values.sort(
        (problem1, problem2) => problem2.dateCreated - problem1.dateCreated
      );
      break;
    case 'Oldest':
      values = values.sort(
        (problem1, problem2) => problem1.dateCreated - problem2.dateCreated
      );
      break;
    case 'Most popular':
      values = values.sort(
        (problem1, problem2) => problem2.likes - problem1.likes
      );
      break;
    case 'Least popular':
      values = values.sort(
        (problem1, problem2) => problem1.likes - problem2.likes
      );
      break;
    default:
      throw Error(`The sort value '${sortByValue}' doesn't exist!`);
  }
  return values;
};

const checkTags = (problems, tags) => {
  if (tags.length === 0) return problems;
  return problems.filter((problem) => {
    for (const tag of tags) {
      console.log(problem.tags);
      if (!problem.tags.includes(tag)) return false;
    }
    return true;
  });
};

const parseString = (ode) => {
  let codeSubmit = '';
  for (let i = 0; i < ode.length; i++) {
    if (i > ode.length - 1) {
      codeSubmit += ode.charAt(i);
      break;
    }
    if (
      ode.charAt(i) == '"' ||
      ode.charAt(i) == '\t' ||
      ode.charAt(i) == '\n' ||
      ode.charAt(i) == "'"
    ) {
      if (ode.charAt(i) == '"') {
        codeSubmit += '\\"';
      } else if (ode.charAt(i) == '\t') {
        codeSubmit += '\\t';
      } else if (ode.charAt(i) == '\n') {
        codeSubmit += '\\n';
      } else if (ode.charAt(i) == "'") {
        codeSubmit += "\\'";
      }
    } else {
      codeSubmit += ode.charAt(i);
    }
  }
  return codeSubmit;
};

// HELPER FUNCTIONS ----------------------------------------

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
  const parsedChoices = choices.map((choice) => choice.text).join(',');
  const parsedTags = tags.join(',');
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

  const parsedTags = tags.join(',');
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
      `insert into algorithmic (title, tags, dateCreated, problemDescription, creatorName, likes, problemType, startingCode, testSuite, language) values ('${title}', '${parsedTags}', '${formattedDate}', '${parseString(
        description
      )}', '${foundUserByEmail}', 0, 'algorithmic', '${parseString(
        startingCode
      )}', '${parseString(testSuite)}', '${language}')`
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

app.patch('/user/:name/profile', async (req, res) => {
  const { name } = req.params;
  const { bio, profilePicture } = req.body;

  try {
    const response = await db.query(
      `update user set profilePicture='${profilePicture}', bio='${bio}' where username='${name}'`
    );
    res.send({ message: `Successfully updated user ${name}`, success: true });
  } catch (e) {
    console.log(e);
    res.send({ message: e.text, success: false });
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

/**
 * Get lists by username
 */

app.get('/user/:name/lists', async (req, res) => {
  const { name } = req.params;
  try {
    const user = await db.query(
      `select lists from user where username='${name}'`
    );
    const lists = user[0].lists;
    res.send(lists);
  } catch (e) {
    throw Error(e);
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

app.patch(`/problems/:problemId/likes`, async (req, res) => {
  const { problemId } = req.params;
  const { likeValue, username, problemType } = req.body;

  const actualProblemType =
    problemType === 'multiple-choice' ? 'multipleChoice' : 'algorithmic';

  try {
    const user = await db.query(
      `select problemsLiked from user where username='${username}'`
    );

    let problemsInteractedWith = !user[0].problemsLiked
      ? ''
      : user[0].problemsLiked.split(',');

    const foundProblem =
      problemsInteractedWith === ''
        ? null
        : problemsInteractedWith.find((problem) => {
            const [searchedProblemType, searchedProblemId] = problem.split('*');
            return (
              searchedProblemType === problemType &&
              searchedProblemId === problemId
            );
          });

    // If a problem is found, then look at the like value and update problemsInteractedWith
    if (foundProblem) {
      let [searchedProblemType, searchedProblemId, searchedProblemLikeValue] =
        foundProblem.split('*');

      searchedProblemLikeValue = parseInt(searchedProblemLikeValue);

      // If the user wants to neither like nor dislike the problem
      if (likeValue === searchedProblemLikeValue) {
        // Check the users original like value and update problemsInteractedWith along with the problem accordingly
        if (searchedProblemLikeValue === 1)
          await db.query(
            `update ${actualProblemType} set likes = likes - 1 where problemId='${problemId}'`
          );
        else
          db.query(
            `update ${actualProblemType} set likes = likes + 1 where problemId='${problemId}'`
          );

        const updatedLikes = user[0].problemsLiked.replace(
          foundProblem + ',',
          ''
        );
        await db.query(
          `update user set problemsLiked='${updatedLikes}' where username='${username}'`
        );
      } else {
        // If the user previously liked a problem, then dislikes it and vice versa
        let updatedLikes = user[0].problemsLiked.replace(
          foundProblem + ',',
          ''
        );
        updatedLikes += `${problemType}*${problemId}*${likeValue},`;

        if (likeValue === 1)
          await db.query(
            `update ${actualProblemType} set likes = likes + 2 where problemId='${problemId}'`
          );
        else
          await db.query(
            `update ${actualProblemType} set likes = likes - 2 where problemId='${problemId}'`
          );

        await db.query(
          `update user set problemsLiked='${updatedLikes}' where username='${username}'`
        );
      }
    } else {
      const updatedLikes =
        problemsInteractedWith + `${problemType}*${problemId}*${likeValue},`;
      if (likeValue === 1)
        await db.query(
          `update ${actualProblemType} set likes = likes + 1 where problemId='${problemId}'`
        );
      else
        await db.query(
          `update ${actualProblemType} set likes = likes - 1 where problemId='${problemId}'`
        );

      await db.query(
        `update user set problemsLiked='${updatedLikes}' where username='${username}'`
      );
    }

    const updatedProblem = await db.query(
      `select likes from ${actualProblemType} where problemId='${problemId}'`
    );

    res.send(updatedProblem[0].likes.toString());
  } catch (e) {
    throw Error(e);
  }
});

// Get problems based on search parameters
app.post('/problems', async (req, res) => {
  const { searchValue, tags, createdBy, sortByValue, searchProblemType } =
    req.body;

  let problems = [];

  // Check whether the user wants Algoritmic, Multiple Choice, or All problems
  switch (searchProblemType) {
    case 'All':
      problems = await getAllProblems(createdBy, searchValue);
      problems = checkTags(problems, tags);
      problems = sortValues(problems, sortByValue);

      break;
    case 'Multiple Choice':
      problems = await db.query(
        `select * from multipleChoice where creatorName like '%${createdBy}%' and title like '%${searchValue}%'`
      );
      problems = getFormattedProblems(problems);
      problems = checkTags(problems, tags);
      problems = sortValues(problems, sortByValue);

      break;
    case 'Algorithmic':
      problems = await db.query(
        `select * from algorithmic where creatorName like '%${createdBy}%' and title like '%${searchValue}%'`
      );
      problems = getFormattedProblems(problems);
      problems = checkTags(problems, tags);
      problems = sortValues(problems, sortByValue);

      break;
    default:
      throw Error(`The problem type '${problemType}' doesn't exist!`);
  }

  res.send(problems);
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
      `select likes, problemType, title, problemId from ${problemType} where problemId = ${problemId}`
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

app.post('/testCode/:problemId', async (req, res) => {
  const { language, code } = req.body;
  const { problemId } = req.params;
  let dbTestJson = null;
  let Test = null;
  try {
    dbTestJson = await db.query(
      `select testSuite from algorithmic where problemId=${problemId}`
    );
    Test = dbTestJson[0]['testSuite'];
  } catch (e) {
    dbTestJson = null;
    Test = null;
  }
  let codeSubmit = '';
  let testSubmit = '';
  //let Test = `if __name__ == "__main__":\n\toutput = execFile.judgeCircle("UDUD")\n\tif output != True:\n\t\tprint('{ "TestName":"JudgeCircle 1", "MethodCall": "JudgeCircle(UDUD)", "ExpectedOutput": "True", "ActualOutput": "' + str(output) + '"}')\n\t\tsys.exit()\n\toutput = execFile.judgeCircle("UDLL")\n\tif output != False:\n\t\tprint('{ "TestName":"JudgeCircle 2", "MethodCall": "JudgeCircle(UDLL)", "ExpectedOutput": "False", "ActualOutput": "' + str(output) + '"}')\n\t\tsys.exit()`;
  for (let i = 0; i < code.length; i++) {
    if (i > code.length - 1) {
      codeSubmit += code.charAt(i);
      break;
    }
    if (
      code.charAt(i) == '"' ||
      code.charAt(i) == '\t' ||
      code.charAt(i) == '\n'
    ) {
      if (code.charAt(i) == '"') {
        codeSubmit += '\\"';
      } else if (code.charAt(i) == '\t') {
        codeSubmit += '\\t';
      } else if (code.charAt(i) == '\n') {
        codeSubmit += '\\n';
      }
    } else {
      codeSubmit += code.charAt(i);
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
  //let jsonInpTemp = `{"TESTS": "if __name__ == \\\"__main__\\\":\\n\\t\\n\\toutput = execFile.fib(3)\\n\\tif output != \\\"0 1 1\\\":\\n\\t\\tprint('{ \\\"TestName\\\":\\\"Fibonacci 1\\\", \\\"MethodCall\\": \\\"fib(3)\\\", \\\"ExpectedOutput\\\": \\\"0 1 1\\\", \\\"ActualOutput\\\": \\\"' + output + '\\\"')\\n\\t\\tsys.exit()\\n\\toutput = execFile.fib(4)\\n\\tif output != \\\"0 1 1 2\\\":\\n\\t\\tprint('{ \\\"TestName\\\":  + \\\"Fibonacci 1\\\", \\\"MethodCall\\\": \\\"fib(3)\\\", \\\"ExpectedOutput\\\": \\\"0 1 1 2\\\", \\\"ActualOutput\\\": \\\"' + output + '\\\"}')\\n\\t\\tsys.exit()", "UserCode":"def fib(inp):\\n\\tif inp==3:\\n\\t\\treturn \\\"0 1 2\\\"\\n\\tif inp==4:\\n\\t\\treturn \\\"0 1 1 2\\\""}`;
  const command =
    'docker run -e VERSION=1.1 -i --rm -p 9000:5000 code-create-python ';
  //Execute docker container and run code
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

export default app;

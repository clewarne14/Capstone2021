const process = require('process');
const fs = require('fs');
const { execSync } = require('child_process');

process.stdin.on('data', (data) => {
  console.log(data.toString('ascii'));
  main(data);
  process.exit();
});
function main(data) {
  dataJson = JSON.parse(data);
  test = dataJson['TESTS'];
  code = dataJson['UserCode'];
  fs.writeFileSync('testFile.js', 'const execFile = require("execFile")');
  fs.writeFileSync('execFile.js', data);
  fs.writeFileSync('testFile.js', data);
  const callTest = async function () {
    var output = execSync('node testFile.js').toString();
    return output;
  };
  let output = callTest();
}

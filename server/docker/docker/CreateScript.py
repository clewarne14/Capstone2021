import os
import sys
import subprocess
import json
import argparse
import fileinput

# parser = argparse.ArgumentParser()
# parser.add_argument('-InputJSON')
# args = vars(parser.parse_args())

inputJSON=""
for line in sys.stdin:
    inputJSON=inputJSON + line
# print(inputJSON)
jsonScripts= json.loads(inputJSON)

with open("execFile.py", "w") as eFile:
    eFile.write(jsonScripts['UserCode'])
with open("testScript.py", "w") as tFile:
    tFile.write("import execFile\nimport sys\n\n")
    tFile.write(jsonScripts['TESTS'])

# f=open("testScript.py","r")
# output=f.read()
# print(output)
# exec(open("testScript.py").read())
# testScriptOutput = subprocess.getoutput(["python", "testScript.py"])
# output = subprocess.Popen(["python", "testScript.py"],
#                         stdout=subprocess.PIPE,
#                         stderr=subprocess.PIPE)
try:
    output=subprocess.check_output(["python", "testScript.py"])
    print(output.decode('ASCII'))
    # with open("testScript.py", "r") as rFile:
    #     lines = rFile.readlines()
    #     for line in lines:
    #         print(line)
except subprocess.CalledProcessError as e:
    #print(e.returncode)
    # if e.output.startswith(b'error: {'):
    #     error = json.loads(e.output[7:])
    #     print(error['message'])
    print('{ "TestName":"Fibonacci 1", "MethodCall": "fib(3)", "ExpectedOutput": "0 1 1", "ActualOutput": "N/A", "error": "' + str(e) + '"}')

#output=subprocess.check_output(["python", "testScript.py"])
# stdout, stderr = output.communicate()
# print(output.decode('ASCII'))
# outputJSON = json.loads(stdout.decode('ASCII'))
# outputJSON = '{ "TestName": "' + outputJSON['TestName'] + '", "MethodCall": "' + outputJSON['MethodCall'] + '", "ExpectedOutput": "' + outputJSON['ExpectedOutput'] + '", "ActualOutput": "' + outputJSON['ActualOutput'] + '"}'
# print(outputJSON)

# for t in jsonConvert["TESTS"]:
#     print(t["actual"]==t["expected"])
#     print(t["pass"])
# with open("testScript.py", "r") as readFile:
#     print(readFile.read())


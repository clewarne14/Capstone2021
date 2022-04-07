import os
import sys
import subprocess
import json
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('-TestJSON')
parser.add_argument('-UserCode')
args = vars(parser.parse_args())

jsonConvert = json.loads(args['TestJSON'])

# print(type(jsonConvert["TESTS"]))
with open("execFile.py", "w") as eFile:
    eFile.write(args['UserCode'])
for t in jsonConvert["TESTS"]:
    with open("testScript.py", "w") as tFile:
        #Build the testing file
        tFile.write("import execFile\n\n")
        tFile.write("if __name__ == '__main__':\n\t")
        tFile.write("output = execFile." + t["methodCall"])
        tFile.write("\n\t")
        tFile.write("print(output)")
    testScriptOutput = subprocess.check_output(["python","testScript.py"])
    #s = exec(open("testScript.py").read())
    #print(testScriptOutput)
    output = testScriptOutput.decode('ascii')
    t["actual"] = output[:-1]
    
    if t["actual"] == t["expected"]:
        t["pass"]="True"
        # print(s.decode('ascii'))
    # rFile = open("testScript.py", "r")
    # print(rFile.read())
    # rFile.close()

# for t in jsonConvert["TESTS"]:
#     print(t["actual"]==t["expected"])
#     print(t["pass"])
# with open("testScript.py", "r") as readFile:
#     print(readFile.read())

jsonOutput = json.dumps(jsonConvert)
print(jsonOutput)

#Execute file, decode output and remove executable file
#s = subprocess.check_output(["python","execFile.py"])
# s = subprocess.check_output(["python", "testScript.py"])
# with open("output.txt", "w") as oFile:
#     oFile.write(s.decode('ascii'))
# print(s.decode('ascii'))
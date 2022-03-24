import os
import sys
import subprocess

# with open("output.txt", "w") as oFile:
#     oFile.write(sys.argv[1])
#     oFile.write(sys.argv[2])
#print("TEST")
# print(sys.argv[2])
# print(sys.argv[3])
#Open new file to transfer code to
# fTemp = open("execFile.py","w")
# fTemp.close
#Transfer input text to new python script
#print(sys.argv[1])
# with open(sys.argv[1], "r") as testScript:
#     linesTest = testScript.readlines
#with open(sys.argv[1], "r") as outputScript:
    #linesOut = outputScript.readlines
with open("execFile.py", "w") as eFile:
    # while True:
        # line = outputScript.readline()
        # if not line:
        #     break
    eFile.write(sys.argv[2])
# with open(sys.argv[2], "r") as testScript:
    #linesTest = testScript.readlines
with open("testScript.py", "w") as tFile:
    # for line in linesOut:
    #     tFile.write(line)
    # while True:
    #     line = testScript.readline()
    #     if not line:
    #         break
    tFile.write(sys.argv[3])

#Execute file, decode output and remove executable file
#s = subprocess.check_output(["python","execFile.py"])
s = subprocess.check_output(["python", "testScript.py"])
with open("output.txt", "w") as oFile:
    oFile.write(s.decode('ascii'))
print(s.decode('ascii'))
#os.system('rm execFile.py')
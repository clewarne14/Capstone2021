import os
import sys
import subprocess

#Open new file to transfer code to
# fTemp = open("execFile.py","w")
# fTemp.close
#Transfer input text to new python script
with open("execFile.py", "w") as eFile:
    for line in sys.stdin[0]:
        eFile.write(line)
with open("testFile.py", "w") as tFile:
    for line in sys.stdin[1]:
        tFile.write(line)

#Execute file, decode output and remove executable file
s = subprocess.check_output(["python","execFile.py"])
#s = subprocess.check_output(["python", "Test")
print(s.decode('ascii'))
#os.system('rm execFile.py')
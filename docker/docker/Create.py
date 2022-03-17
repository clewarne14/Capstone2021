import os
import sys
import subprocess
#import execFile


#print(sys.stdin[0])
# testFile = open(sys.argv[1],"r")
# print(testFile.read)
fTemp = open("execFile.py","w")
fTemp.close
# execFile = open("execFile.py","a")
# for line in sys.stdin:
#     execFile.write(line)
with open("execFile.py", "w") as eFile:
    for line in sys.stdin:
        eFile.write(line)
#os.system('python execFile.py')
#execFile.close
#Execute.exec(open('execFile.py').read())
# print("\n\n")
#print(execFile)
s = subprocess.check_output(["python","execFile.py"])
print(s.decode('ascii'))
#print(exec(open('execFile.py').read()))
os.system('rm execFile.py')
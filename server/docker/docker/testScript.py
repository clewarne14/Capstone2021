import execFile
import sys

if __name__ == "__main__":
	output = execFile.fib(3)
	if output != "0 1 1":
		print('{ "TestName":"Fibonacci 1", "MethodCall": "fib(3)", "ExpectedOutput": "0 1 1", "ActualOutput": "' + output + '"}')
		sys.exit()
	output = execFile.fib(4)
	if output != "0 1 1 2":
		print('{ "TestName":  + "Fibonacci 1", "MethodCall": "fib(3)", "ExpectedOutput": "0 1 1 2", "ActualOutput": "' + output + '"}')
		sys.exit()


if __name__ == "__main__":
	output = execFile.judgeCircle("UDUD")
	if output != True:
		print('{ "TestName":"JudgeCircle 1", "MethodCall": "JudgeCircle(\\\"UDUD\\\")", "ExpectedOutput": "True", "ActualOutput": "' + str(output) + '"}')
		sys.exit()
	output = execFile.judgeCircle("UDLL")
	if output != False:
		print('{ "TestName":"JudgeCircle 2", "MethodCall": "JudgeCircle(\\\"UDLL\\\"", "ExpectedOutput": "False", "ActualOutput": "' + str(output) + '"}')
		sys.exit()
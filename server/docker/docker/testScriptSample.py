import execFile
import sys

# Adrian, this is a good example of what the user should put in for the test script. Keep the same print output and names
# of json objects but can make different method calls. Also, tell them to not include the imports execFile or sys.
# Those imports will be added when the code is tested.
if __name__ == "__main__":
	output = execFile.fib(3)
	if output != 0:
		print('{ "TestName":"Fibonacci 1", "MethodCall": "fib(3)", "ExpectedOutput": "0 1 1", "ActualOutput": "' + output + '"}')
		sys.exit()
	output = execFile.fib(4)
	if output != "0 1 1 2":
		print('{ "TestName":"Fibonacci 1", "MethodCall": "fib(3)", "ExpectedOutput": "0 1 1 2", "ActualOutput": "' + output + '"}')
		sys.exit()
FROM python:3

#WORKDIR /docker
COPY /docker/docker/CreateScript.py ./
#CMD ["python", "/docker/Create.py", "/Users/clewarne/Capstone2021/server/docker/docker/*.txt"]
ENTRYPOINT ["python", "./CreateScript.py"]
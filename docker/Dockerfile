# FROM node:alpine
# COPY . /docker
# WORKDIR /docker
# CMD node index.js
# FROM python:3
# COPY . /docker
# WORKDIR /docker
# RUN pip install --no-cache-dir -r requirements.txt
# # COPY . .
# CMD [ "python", "./your-daemon-or-script.py" ]

FROM python:3

WORKDIR /docker
RUN echo "print(\"Hello World\")" > Test.py
# COPY requirements.txt ./
# RUN pip install --no-cache-dir -r requirements.txt

# COPY . .
CMD ["python", "Test.py" ]
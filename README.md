# Capstone2021
![image](https://user-images.githubusercontent.com/60367655/160899360-7ecfa490-8928-4bf6-a9ed-d528abf20e68.png)
---

## Getting started

To develop with CodeCreate, a few things need to be done.

1. Install all necessary dependencies in both the server and client directory using `npm install`
2. Create a .env file in both the server and client directory.
   - Within the .env in the **server** directory, fill in these values:
   ```
   USER=
   PASSWORD=
   DATABASE=
   SERVER_PORT=
   DATABASE_PORT=
   HOST=
   ```
   - Within the .env in the **client** directory, fill in these values:
   ```
   SASS_PATH=./node_modules;./src # This is if you're using Windows
   SASS_PATH=node_modules:src # This is if you're using MacOS
   REACT_APP_AUTH0_DOMAIN=
   REACT_APP_AUTH0_CLIENT_ID=
   REACT_APP_AUTH0_SCOPE=
   REACT_APP_AUTH0_AUDIENCE=
   ```
3. Paste the aws*skysql_chain.pem* file in the root directory of server. This is to ensure we have the correct permissions for our database connection.

## You're good to go!!!

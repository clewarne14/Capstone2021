# Capstone2021
---
## Getting started
To develop with CodeCreate, a few things need to be done.
1. Install all necessary dependencies in both the server and client directory using ```npm install```
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
   ```
 3. Paste the aws_skysql_chain.pem_ file in the root directory of server. This is to ensure we have the correct permissions for our database connection.

## You're good to go!!!

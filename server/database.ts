import fs from "fs";
import mariadb from "mariadb";

const serverCert = [fs.readFileSync("aws_skysql_chain.pem")];

const getDb = (
  user: string,
  password: string,
  database: string,
  host: string,
  port: number
) => {
  const pool = mariadb.createPool({
    user,
    password,
    database,
    host,
    port,
    acquireTimeout: 3000,
    ssl: { ca: serverCert },
  });

  return pool;
};

export { getDb };

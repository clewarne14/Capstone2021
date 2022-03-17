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
    ssl: { ca: serverCert },
    acquireTimeout: 2000,
  });

  return pool;
};

export { getDb };

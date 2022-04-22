import fs from 'fs';
import mariadb from 'mariadb';

const serverCert = [fs.readFileSync('aws_skysql_chain.pem')];

const getDb = (
  user: string,
  password: string,
  database: string,
  host: string,
  port: number
) => {
  let pool;
  try {
    pool = mariadb.createPool({
      user,
      password,
      database,
      host,
      port,
      acquireTimeout: 3000,
      ssl: { ca: serverCert },
    });
  } catch (e) {
    throw e;
  }

  return pool;
};

export { getDb };

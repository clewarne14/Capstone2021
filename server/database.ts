import mariadb from "mariadb";

const getDb = (user: string, password: string, database: string) => {
  const pool = mariadb.createPool({
    user,
    password,
    database,
  });

  return pool;
};

export { getDb };

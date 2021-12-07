import { Database, sqlite3 as Sqlite } from "sqlite3";
const sqlite3: Sqlite = require("sqlite3");

const verbose = sqlite3.verbose();
const db = new verbose.Database(":memory:");

export default db;

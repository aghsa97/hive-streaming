import sqlite3 from "sqlite3";
sqlite3.verbose();
import { open, Database } from "sqlite";

let db: Database | null = null; // This is a singleton, so we will only have one connection to the DB

export async function initializeDb(): Promise<Database> {
  if (db) return db;
  db = await open({
    filename: "./mydb.sqlite",
    driver: sqlite3.Database,
  });

  await db.exec(`CREATE TABLE IF NOT EXISTS operations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id varchar(255),
    cpu_load FLOAT,
    timestamp BIGINT
)`);

  return db;
}

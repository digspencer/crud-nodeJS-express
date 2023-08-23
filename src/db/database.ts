// database.ts
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('passwords.db');

db.run(`
  CREATE TABLE IF NOT EXISTS passwords (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    service TEXT NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL
  )
`);

export default db;

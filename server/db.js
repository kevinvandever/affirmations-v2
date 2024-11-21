import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize SQLite database
const dbPath = join(__dirname, '../data/affirmation.db');

// Ensure data directory exists
const dataDir = dirname(dbPath);
try {
  await fs.mkdir(dataDir, { recursive: true });
} catch (err) {
  if (err.code !== 'EEXIST') {
    console.error('Failed to create data directory:', err);
    throw err;
  }
}

let db;

export async function initDb() {
  try {
    console.log('Initializing database...');
    
    // Open database connection
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    // Enable foreign keys
    await db.run('PRAGMA foreign_keys = ON');

    // Read and execute schema
    const schemaPath = join(__dirname, 'schema.sql');
    const schema = await fs.readFile(schemaPath, 'utf-8');
    await db.exec(schema);

    console.log('Database initialized successfully');
    return db;
  } catch (err) {
    console.error('Database initialization error:', err);
    throw err;
  }
}

export async function getDb() {
  if (!db) {
    await initDb();
  }
  return db;
}
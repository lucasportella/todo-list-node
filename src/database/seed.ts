import { pool } from '#database/connection';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


export async function seed() {

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS seeds (
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL UNIQUE,
    run_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)
  console.log('Seed table created.');

  const [rows] = await pool.execute<any[]>(`SELECT filename FROM seeds`);
  const ran = rows.map((row) => row.filename)
  const files = fs.readdirSync(path.join(__dirname, "seeds"))

  for (const file of files) {
    if (ran.includes(file)) {
      continue
    }

    const filepath = path.join(__dirname, 'seeds', file)
    const sqlQuery = fs.readFileSync(filepath, 'utf-8')
    await pool.execute(sqlQuery)
    await pool.execute('INSERT INTO seeds (filename) VALUES (?)', [file])
  }
}
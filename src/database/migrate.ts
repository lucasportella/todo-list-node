import { pool } from '@database/connection.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


export async function migrate() {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS migrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL UNIQUE,
    run_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `)

  console.log('Migration table created.')

  const [rows] = await pool.execute<any[]>(`SELECT filename from migrations`)
  const ran = rows.map((row) => row.filename);

  const migrationsDir = path.join(__dirname, 'migrations');
  const files = fs.readdirSync(migrationsDir);

  for (const file of files) {
    if (ran.includes(file)) {
      continue
    }

    const filepath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(filepath, 'utf-8');
    await pool.execute(sql)
    await pool.execute(`INSERT INTO migrations (filename) VALUES (?)`, [file])
  }
  console.log('Migrations run.')

}

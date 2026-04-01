import { pool } from "./database/connection.js";

export const connectDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    console.log('Database connected!');
  } catch (e) {
    console.error("Failed to connect to database.")
  }
}
import { env } from "./config.js";
import { pool } from "#database/connection";
import { migrate } from '#database/migrate'
import { seed } from '#database/seed'
import { app } from './app.js';

const connectDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    console.info('Database connected!');
  } catch (e) {
    console.error("Failed to connect to database.")
  }
}

const startServer = () => {
  app.listen(env.SERVER_PORT, () => {
    console.info("Server is running on port", env.SERVER_PORT)
  })
}

const main = async () => {
  try {
    await connectDatabase();
    await migrate()
    if (env.NODE_ENV === 'dev') {
      await seed()
    }
    startServer();
  } catch (e) {
    console.error(e);
    process.exit(1)
  }
}

main()
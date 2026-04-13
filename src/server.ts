import { pool } from "#database/connection";
import { migrate } from '#database/migrate'
import { seed } from '#database/seed'
import { app } from "./app.js";
import 'dotenv/config'

const connectDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    console.info('Database connected!');
  } catch (e) {
    console.error("Failed to connect to database.")
  }
}

const serverPort = process.env.SERVER_PORT
const startServer = () => {
  app.listen(serverPort, () => {
    console.info("Server is running on port", serverPort)
  })
}

const main = async () => {
  try {
    await connectDatabase();
    await migrate()
    if (process.env.NODE_ENV === 'dev') {
      await seed()
    }
    startServer();
  } catch (e) {
    console.error(e);
    process.exit(1)
  }
}

main()
import { pool } from "#database/connection";
import { migrate } from '#database/migrate'
import { seed } from '#database/seed'
import { app } from "./app.js";

const connectDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    console.log('Database connected!');
  } catch (e) {
    console.error("Failed to connect to database.")
  }
}
const startServer = () => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000")
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
import express from 'express'
import cors from 'cors'
import { connectDatabase } from './server.js'
import { migrate } from '@database/migrate.js'
import { seed } from '@database/seed.js'
import { userRoutes } from '@routes/userRoutes.js'

export const app = express()
app.use(express.json())
app.use(cors())
app.use("/users", userRoutes())

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

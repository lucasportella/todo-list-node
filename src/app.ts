import express from 'express'
import cors from 'cors'
import { connectDatabase } from './server.js'
import { migrate } from '@database/migrate.js'
import { seed } from '@database/seed.js'
import { userRoutes } from '@routes/userRoutes.js'
import { errorHandler } from './middlewares/error.js'
import { todosRoutes } from '@routes/todosRoutes.js'

//TODO:
// docker
// zod
// password hashing and verification
// eslint
// unit tests
// logging
// rate limit

export const app = express()

app.use(express.json())
app.use(cors())
app.use("/users", userRoutes())
app.use("/:userId/todos", todosRoutes())
app.use(errorHandler)

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

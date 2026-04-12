import express from 'express'
import cors from 'cors'
import { userRoutes } from '#routes/userRoutes'
import { errorHandler } from './middlewares/error.js'
import { todosRoutes } from '#routes/todosRoutes'

//TODO:
// password hashing and verification
// zod
// eslint
// unit tests
// logging
// rate limit

export const app = express()

app.use(express.json())
app.use(cors())
app.use("/users", userRoutes())
app.use("/user/:userId/todos", todosRoutes())
app.use(errorHandler)

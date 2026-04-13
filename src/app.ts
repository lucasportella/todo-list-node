import express from 'express'
import cors from 'cors'
import { userRoutes } from '#routes/userRoutes'
import { errorHandler } from './middlewares/error.js'
import { todosRoutes } from '#routes/todosRoutes'
import { authRoutes } from '#routes/authRoutes'

//TODO:
// docker local managing
// password hashing and verification
// zod
// eslint
// unit tests

export const app = express()

app.use(express.json())
app.use(cors())
app.use("/users", userRoutes())
app.use("/user/:userId/todos", todosRoutes())
app.use("/auth", authRoutes())
app.use(errorHandler)

import express from 'express'
import httpStatus from 'http-status-codes'
import cors from 'cors'
import { connectDatabase } from './server.js'

export const app = express()
app.use(express.json())
app.use(cors())

const startServer = () => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000")
  })
}

const main = async () => {
  try {
    await connectDatabase();
    startServer();
  } catch (e) {
    console.error(e);
    process.exit(1)
  }
}

main()

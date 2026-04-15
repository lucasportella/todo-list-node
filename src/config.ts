import 'dotenv/config';

const required = (key: string) => {
  if (!process.env[key]) {
    throw new Error(`Missing ${key} env.`)
  }
  return process.env[key]
}

export const env = {
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: Number(process.env.DB_PORT) || 3306,
  DB_NAME: process.env.DB_NAME || 'todo_list',
  NODE_ENV: process.env.NODE_ENV || 'dev',
  SERVER_PORT: Number(process.env.SERVER_PORT) || 3002,
  DB_USER: required('DB_USER'),
  DB_PASS: required('DB_PASS'),
  JWT_SECRET: required("JWT_SECRET"),
}

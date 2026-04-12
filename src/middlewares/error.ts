import type { Request, Response, NextFunction } from "express"
import { StatusCodes } from "http-status-codes"

export class AppError extends Error {
  public statusCode: number = 400

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    this.name = "AppError"
  }
}

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message });
  }
  if (err instanceof Error && 'code' in err && err.code === 'ER_DUP_ENTRY') {
    res.status(StatusCodes.CONFLICT).json({ message: 'Email already in use' })
    return;
  }
  console.error(err)
  res.status(500).json({ message: "Internal Server Error" })
}

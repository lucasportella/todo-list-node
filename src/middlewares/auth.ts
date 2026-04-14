import type { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { AppError } from './error.js';
import { env } from '#config.js';
import { UserRepository } from '#repositories/UserRepository';


export async function authHandler(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new AppError("Missing auth token.", StatusCodes.UNAUTHORIZED)
  }

  let payload: JwtPayload | string;
  let sub: number;

  try {
    payload = jwt.verify(token, env.JWT_SECRET);
    if (typeof payload === 'string') {
      throw new AppError("Invalid auth token.", StatusCodes.UNAUTHORIZED)
    }
    sub = Number(payload?.sub)
    if (Number.isNaN(sub)) {
      throw new AppError("Invalid auth token.", StatusCodes.UNAUTHORIZED)
    }
  } catch (e) {
    console.error("Invalid auth token.", e)
    throw new AppError("Invalid auth token.", StatusCodes.UNAUTHORIZED)
  }

  const userRepository = new UserRepository()

  const result = await userRepository.findById(sub);
  if (Number(result?.id) !== sub || result?.role !== payload.role) {
    throw new AppError("Invalid auth token.", StatusCodes.UNAUTHORIZED)
  }

  (req as any).user = {
    id: Number(payload.sub),
    role: payload.role,
  }
  return next()
}

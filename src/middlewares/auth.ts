import type { Request, Response, NextFunction } from 'express'
import { AppError } from './error.js';
import { StatusCodes } from 'http-status-codes';
import { UserRepository } from '#repositories/UserRepository';
import bcrypt from 'bcrypt';

export async function authHandler(req: Request, res: Response, next: NextFunction) {

  next()
}

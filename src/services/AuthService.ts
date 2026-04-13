import { AppError } from "#middlewares/error";
import { AuthRepository } from "#repositories/AuthRepository";
import { StatusCodes } from "http-status-codes";
import { env } from "#config.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export class AuthService {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.authRepository.findAuthUserByEmail(email);
    if (!user?.email || !user?.hashed_password) {
      throw new AppError("Invalid email or password.", StatusCodes.UNAUTHORIZED)
    }

    if (!await bcrypt.compare(password, user.hashed_password)) {
      throw new AppError("Invalid email or password", StatusCodes.UNAUTHORIZED);
    }

    if (!env.JWT_SECRET) {
      throw new AppError("Internal Server Error. Missing environment variable.", StatusCodes.INTERNAL_SERVER_ERROR)
    }
    const token = jwt.sign({ email: user.email, role: user.role }, env.JWT_SECRET, { expiresIn: "2 days" })
    return token;
  }
}

import { AuthService } from "#services/AuthService";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";


export class AuthController {
  private authService: AuthService

  constructor(authService: AuthService) {
    this.authService = authService
  }

  async login(req: Request, res: Response) {
    const { email, password} = req.body
    const result = await this.authService.login(email, password)
    return res.status(StatusCodes.OK).json(result);
  }
}
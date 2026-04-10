import type { Request, Response } from 'express';
import type { UserService } from '@services/UserService.js';
import { StatusCodes } from 'http-status-codes';

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async findAll(req: Request, res: Response): Promise<void> {
    const users = await this.userService.findAll();
    res.status(StatusCodes.OK).json(users)
  }

  async findById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const user = await this.userService.findById(id);
    res.status(StatusCodes.OK).json(user)
  }

  async findByEmail(req: Request, res: Response): Promise<void> {
    const { email } = req.body || ''
    const user = await this.userService.findByEmail(email as string);
    res.status(StatusCodes.OK).json(user);
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const user = await this.userService.createUser(req.body)
    res.status(StatusCodes.OK).json(user);
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const user = await this.userService.updateUser(req.body);
    res.status(StatusCodes.OK).json(user)
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const id = req.params.id || ""
    const result = await this.userService.deleteUser(id as string);
    res.status(StatusCodes.OK).json(result)
  }

}

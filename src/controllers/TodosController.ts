import type { Request, Response } from "express";
import { TodosService } from "#services/TodosService";
import { StatusCodes } from "http-status-codes";


export class TodosController {
  private todosService: TodosService

  constructor(todosService: TodosService) {
    this.todosService = todosService;
  }

  async findAll(req: Request, res: Response) {
    const userId = Number(req.params.userId)
    const result = await this.todosService.findAll(userId)
    return res.status(StatusCodes.OK).json(result);
  }

  async findById(req: Request, res: Response) {
    const userId = Number(req.params.userId)
    const id = Number(req.params.id)
    const result = await this.todosService.findOne(userId, id)
    return res.status(StatusCodes.OK).json(result)
  }

  async createTodo(req: Request, res: Response) {
    const userId = Number(req.params.userId)
    const { title, description, status } = req.body
    const result = await this.todosService.createTodo({ userId, title, description, status });
    return res.status(StatusCodes.CREATED).json(result)
  }

  async updateTodo(req: Request, res: Response) {
    const userId = Number(req.params.userId)
    const id = Number(req.params.id)
    const { title, description, status } = req.body
    const result = await this.todosService.updateTodo({ id, userId, title, description, status })
    return res.status(StatusCodes.OK).json(result)
  }

  async deleteTodo(req: Request, res: Response) {
    const userId = Number(req.params.userId)
    const id = Number(req.params.id)
    const result = await this.todosService.deleteTodo(userId, id)
    return res.status(StatusCodes.OK).json(result)
  }
}

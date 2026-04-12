import type { NewTodo, UpdateTodo } from "#models/Todos";
import { TodosRepository } from "#repositories/TodosRepository";


export class TodosService {
  private todosRepository: TodosRepository

  constructor(todosRepository: TodosRepository) {
    this.todosRepository = todosRepository
  }

  async findAll(userId: number) {
    const result = await this.todosRepository.findAll(userId);
    return result
  }

  async findOne(userId: number, id: number) {
    const result = await this.todosRepository.findById(userId, id);
    return result
  }

  async createTodo(newTodo: NewTodo) {
    const result = await this.todosRepository.createTodo(newTodo);
    return result
  }

  async updateTodo(updateTodo: UpdateTodo) {
    const result = await this.todosRepository.updateTodo(updateTodo);
    return result
  }

  async deleteTodo(userId: number, id: number) {
    const result = await this.todosRepository.deleteTodo(userId, id);
    return result
  }
}

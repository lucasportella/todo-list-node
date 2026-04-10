import type { NewTodo, Todo, UpdateTodo } from "@models/Todos.js";
import { pool } from "@database/connection.js"
import type { ResultSetHeader, RowDataPacket } from "mysql2";

export interface TodoRow extends RowDataPacket, Todo { } // empty {} to combine both types

export class TodosRepository {
  async findAll(userId: number): Promise<Todo[]> {
    const [rows] = await pool.execute<TodoRow[]>("SELECT * FROM todos WHERE userId = ?", [userId]);
    return rows;
  }

  async findById(userId: number, id: number): Promise<Todo | null> {
    const [rows] = await pool.execute<TodoRow[]>("SELECT * FROM todos WHERE userId = ? AND id = ?", [userId, id])
    return rows[0] ?? null;
  }

  async createTodo(newTodo: NewTodo): Promise<Todo | null> {
    const [result] = await pool.execute<ResultSetHeader>("INSERT INTO todos (userId, title, description, status) VALUES (?, ?, ?, ?)", [newTodo.userId, newTodo.title, newTodo.description ?? null, newTodo.status]);
    const todo = await this.findById(newTodo.userId, result.insertId)
    return todo;
  }

  async updateTodo(todo: UpdateTodo): Promise<Todo | null> {
    await pool.execute<ResultSetHeader>("UPDATE todos SET (title, description, status) VALUES (?, ?, ?, ?) WHERE userId = ? AND id = ?", [todo.title, todo.description || null, todo.status, todo.userId, todo.id])
    const updatedTodo = await this.findById(todo.userId, todo.id);
    return updatedTodo ?? null;
  }

  async deleteTodo(userId: number, id: number): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>("DELETE FROM todos WHERE userId = ? AND id = ?", [userId, id])
    return result.affectedRows > 0
  }
}

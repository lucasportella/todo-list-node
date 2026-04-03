import { pool } from "@database/connection.js";
import type { NewUser, User } from "@models/User.js";
import type { RowDataPacket } from "mysql2";

interface UserRow extends RowDataPacket, User { } // empty {} to combine both types


export class UserRepository {
  async findAll(): Promise<User[]> {
    const [rows] = await pool.execute<UserRow[]>('SELECT * FROM users')
    return rows;
  }

  async findById(id: string): Promise<User | null> {
    const [rows] = await pool.execute<UserRow[]>("SELECT * From users WHERE id = ? ", [id])
    return rows[0] ?? null
  }

  async findByEmail(email: string): Promise<User | null> {
    const [rows] = await pool.execute<UserRow[]>("SELECT * FROM users WHERE email = ?", [email])
    return rows[0] ?? null;
  }

  async createUser(newUser: NewUser): Promise<User | null> {
    const [rows] = await pool.execute<UserRow[]>("INSERT INTO users (? ? ?)", [newUser.name, newUser.email, newUser.hashed_password, "user"]);
    return rows[0] ?? null
  }
}

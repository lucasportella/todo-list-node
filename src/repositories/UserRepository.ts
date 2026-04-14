import { pool } from "#database/connection";
import type { UserLoginAuth } from "#models/Auth";
import type { NewUserWithHashedPass, PublicUser, UpdateUser } from "#models/User";
import { type ResultSetHeader, type RowDataPacket } from "mysql2";

export interface PublicUserRow extends RowDataPacket, PublicUser { } // empty {} to combine both types
export interface UserLoginAuthRow extends RowDataPacket, UserLoginAuth { }

export class UserRepository {

  async findAll(): Promise<PublicUser[]> {
    const [rows] = await pool.execute<PublicUserRow[]>('SELECT id, name, email, role FROM users')
    return rows;
  }

  async findById(id: number): Promise<PublicUser | null> {
    const [rows] = await pool.execute<PublicUserRow[]>("SELECT id, name, email, role From users WHERE id = ?", [id])
    return rows[0] ?? null
  }

  async findByEmail(email: string): Promise<PublicUser | null> {
    const [rows] = await pool.execute<PublicUserRow[]>("SELECT id, name, email, role FROM users WHERE email = ?", [email])
    return rows[0] ?? null;
  }

  async createUser(newUser: NewUserWithHashedPass): Promise<PublicUser | null> {
    const [result] = await pool.execute<ResultSetHeader>("INSERT INTO users (name, email, hashed_password, role) VALUES(?, ?, ?, ?)", [newUser.name, newUser.email, newUser.hashed_password, "user"]);

    const [rows] = await pool.execute<PublicUserRow[]>("SELECT id, name, email FROM users WHERE id = ?", [result.insertId])
    return rows[0] ?? null
  }

  async updateUser(user: UpdateUser): Promise<PublicUser | null> {
    await pool.execute<ResultSetHeader>("UPDATE users SET name = ?, email = ?, hashed_password = ? WHERE id = ?", [user.name, user.email, user.hashed_password, user.id]);

    const [rows] = await pool.execute<PublicUserRow[]>("SELECT id, name, email FROM users WHERE id = ?", [user.id])
    return rows[0] ?? null;
  }

  async deleteUser(id: string): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>("DELETE from users WHERE id = ?", [id])
    return result.affectedRows > 0
  }
}

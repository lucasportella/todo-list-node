import { pool } from "#database/connection"
import type { UserLoginAuth } from "#models/Auth";
import type { RowDataPacket } from "mysql2";

export interface UserLoginAuthRow extends RowDataPacket, UserLoginAuth { }


export class AuthRepository {
  async findByEmailForAuth(email: string): Promise<UserLoginAuth | null> {
    const [rows] = await pool.execute<UserLoginAuthRow[]>("SELECT email, name, role, hashed_password FROM users WHERE email = ?", [email]);
    return rows[0] ?? null
  }

}
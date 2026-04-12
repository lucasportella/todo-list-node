import type { NewUser, PublicUser, UpdateUser } from "#models/User";
import { UserRepository } from "#repositories/UserRepository";
import bcrypt from "bcrypt";

export class UserService {
  private userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  async findAll(): Promise<PublicUser[]> {
    const result = await this.userRepository.findAll();
    return result;
  }

  async findById(id: number): Promise<PublicUser | null> {
    const result = await this.userRepository.findById(id);
    return result;
  }

  async findByEmail(email: string): Promise<PublicUser | null> {
    const result = await this.userRepository.findByEmail(email);
    return result;
  }

  async createUser(newUser: NewUser): Promise<PublicUser | null> {
    const hashed_password = await bcrypt.hash(newUser.password, 10)
    const result = await this.userRepository.createUser({
      email: newUser.email,
      name: newUser.name,
      hashed_password: hashed_password,
    });
    return result;
  }

  async updateUser(updateUser: UpdateUser): Promise<PublicUser | null> {
    const result = await this.userRepository.updateUser(updateUser);
    return result;
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await this.userRepository.deleteUser(id);
    return result;
  }
}

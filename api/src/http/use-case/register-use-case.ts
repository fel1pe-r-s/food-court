import { Role, User } from "@prisma/client";
import { UsersPrismaRepository } from "../repositories/prisma-users";
import { hash } from "bcryptjs";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
  role?: Role;
}
interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersPrismaRepository) {}
  async execute({
    email,
    name,
    password,
    role,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userWithEmail = await this.usersRepository.findByEmail(email);
    if (userWithEmail) {
      throw new Error("User with email already exists");
    }
    const password_hash = await hash(password, 10);
    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash: password_hash,
      role: role ? "ADMIN" : undefined,
    });
    return { user };
  }
}

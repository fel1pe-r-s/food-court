import { UsersPrismaRepository } from "@/http/repositories/prisma-users";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}
interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersPrismaRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const doestPasswordMatch = await compare(password, user.passwordHash);

    if (!doestPasswordMatch) {
      throw new Error("User not found");
    }

    return {
      user,
    };
  }
}

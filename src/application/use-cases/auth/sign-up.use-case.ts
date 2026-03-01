import { User } from "../../../domain/entities/user/user.entity";
import { BadRequestException } from "../../../domain/exceptions/http.exception";
import type { IPasswordHasher } from "../../ports/auth/password-hasher.interface";
import type { IUserRepository } from "../../ports/users/user.repository.interface";

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordHasher: IPasswordHasher,
  ) {}

  async execute(
    username: string,
    plainPassword: string,
  ): Promise<Omit<User, "password">> {
    const existingUser = await this.userRepository.findByUsername(username);

    if (existingUser) {
      throw new BadRequestException("Username is already registered");
    }

    const hashedPassword = await this.passwordHasher.hash(plainPassword);

    const user = new User(
      crypto.randomUUID(),
      username,
      hashedPassword,
      new Date(),
    );

    await this.userRepository.save(user);

    const { password, ...result } = user;

    return result;
  }
}

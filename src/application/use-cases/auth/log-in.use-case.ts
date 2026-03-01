import type { IUserRepository } from "../../ports/users/user.repository.interface";
import type { IPasswordHasher } from "../../ports/auth/password-hasher.interface";
import type { ITokenGenerator } from "../../ports/auth/token-generateor.interface";
import { UnauthorizedException } from "../../../domain/exceptions/http.exception";

export class LogInUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordHasher: IPasswordHasher,
    private tokenGenerator: ITokenGenerator,
  ) {}

  async execute(username: string, password: string): Promise<string> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException("Invalid username or password.");
    }

    const valid = await this.passwordHasher.compare(password, user.password);

    if (!valid) {
      throw new UnauthorizedException("Invalid username or password.");
    }

    const token = this.tokenGenerator.generateToken({
      sub: user.id,
      user: user.username,
    });

    return token;
  }
}

import type { Request, Response } from "express";
import type { SignUpUseCase } from "../../application/use-cases/auth/sign-up.use-case";
import type { LogInUseCase } from "../../application/use-cases/auth/log-in.use-case";
import { BadRequestException } from "../../domain/exceptions/http.exception";

export class AuthController {
  constructor(
    private signUpUseCase: SignUpUseCase,
    private logInUseCase: LogInUseCase,
  ) {}

  async signup(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new BadRequestException("Username and password are required.");
    }

    const user = await this.signUpUseCase.execute(username, password);

    res.status(201).json({
      message: "Sign up successful.",
      user,
    });
  }

  async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new BadRequestException("Username and password are required.");
    }

    const token = await this.logInUseCase.execute(username, password);

    res.status(200).json({
      message: "Log in successful.",
      token,
    });
  }

  async getMe(req: Request, res: Response): Promise<void> {
    const user = req.user;

    res.status(200).json({ user });
  }
}

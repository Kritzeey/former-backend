import { Router } from "express";
import { DrizzleUserRepository } from "../../infrastructure/db/users/drizzle-user.repository";
import { PasswordHasher } from "../../infrastructure/security/password-hasher";
import { AuthController } from "../controllers/auth.controller";
import { SignUpUseCase } from "../../application/use-cases/auth/sign-up.use-case";
import { LogInUseCase } from "../../application/use-cases/auth/log-in.use-case";
import { TokenGenerator } from "../../infrastructure/security/token-generator";

const router = Router();

const userRepository = new DrizzleUserRepository();

const passwordHasher = new PasswordHasher();
const tokenGenerator = new TokenGenerator();

const signUpUseCase = new SignUpUseCase(userRepository, passwordHasher);
const logInUseCase = new LogInUseCase(
  userRepository,
  passwordHasher,
  tokenGenerator,
);

const authController = new AuthController(signUpUseCase, logInUseCase);

router.post("/sign-up", (req, res) => authController.signup(req, res));
router.post("/log-in", (req, res) => authController.login(req, res));

export default router;

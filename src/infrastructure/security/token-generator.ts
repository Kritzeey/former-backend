import jwt from "jsonwebtoken";
import type { ITokenGenerator } from "../../application/ports/auth/token-generateor.interface";

export class TokenGenerator implements ITokenGenerator {
  generateToken(payload: any): string {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
  }
}

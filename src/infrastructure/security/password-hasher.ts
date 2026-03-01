import type { IPasswordHasher } from "../../application/ports/auth/password-hasher.interface";
import { compare, hash } from "bcrypt";

export class BcryptPasswordHasher implements IPasswordHasher {
  async hash(password: string): Promise<string> {
    const saltRounds = 10;

    return await hash(password, saltRounds);
  }

  async compare(password: string, hash: string) {
    return await compare(password, hash);
  }
}

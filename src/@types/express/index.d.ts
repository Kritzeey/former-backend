import { User } from "../../domain/entities/users/user.entity";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        user: string;
      };
    }
  }
}

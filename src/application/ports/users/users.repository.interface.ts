import { User } from "../../../domain/entities/users/user.entity";

export interface IUserRepository {
  findByUsername(username: string): Promise<User | null>;
  save(user: User): Promise<void>;
}

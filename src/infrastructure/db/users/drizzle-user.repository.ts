import { eq } from "drizzle-orm";
import type { IUserRepository } from "../../../application/ports/users/user.repository.interface";
import { User } from "../../../domain/entities/user/user.entity";
import { usersTable } from "../../../../db/schema";
import { db } from "../../../../db/db";

export class DrizzleUserRepository implements IUserRepository {
  private mapToDomain(record: typeof usersTable.$inferSelect): User {
    return new User(
      record.id,
      record.username,
      record.password,
      record.createdAt,
    );
  }

  async findByUsername(username: string): Promise<User | null> {
    const records = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, username))
      .limit(1);

    const record = records[0];

    if (!record) {
      return null;
    }

    return this.mapToDomain(record);
  }

  async save(user: User): Promise<void> {
    await db.insert(usersTable).values({
      id: user.id,
      username: user.username,
      password: user.password,
      createdAt: user.createdAt,
    });
  }
}

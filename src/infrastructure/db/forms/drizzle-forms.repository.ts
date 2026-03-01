import { eq, desc, asc, ilike, and } from "drizzle-orm";
import { db } from "../../../../db/db";
import type { IFormRepository } from "../../../application/ports/forms/forms-repository.interface";
import { Form } from "../../../domain/entities/forms/form.entity";
import { formsTable } from "../../../../db/schema";

export class DrizzleFormRepository implements IFormRepository {
  private mapToDomain(record: typeof formsTable.$inferSelect): Form {
    return new Form(
      record.id,
      record.userId,
      record.title,
      record.description,
      record.createdAt,
      record.updatedAt,
      record.status,
    );
  }

  async save(form: Form): Promise<void> {
    await db.insert(formsTable).values({
      id: form.id,
      userId: form.userId,
      title: form.title,
      description: form.description,
      status: form.status,
      createdAt: form.createdAt,
      updatedAt: form.updatedAt,
    });
  }

  async findAll(
    search?: string,
    status?: "active" | "closed",
    sortBy: "asc" | "desc" = "desc"
  ): Promise<Form[]> {
    const conditions = [];

    if (search) {
      conditions.push(ilike(formsTable.title, `%${search}%`));
    }

    if (status) {
      conditions.push(eq(formsTable.status, status));
    }

    const orderDirection = sortBy === "asc" ? asc : desc;

    const records = await db
      .select()
      .from(formsTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(orderDirection(formsTable.createdAt));

    return records.map((record) => this.mapToDomain(record));
  }

  async findById(id: string): Promise<Form | null> {
    const records = await db
      .select()
      .from(formsTable)
      .where(eq(formsTable.id, id))
      .limit(1);

    const record = records[0];

    if (!record) {
      return null;
    }

    return this.mapToDomain(record);
  }

  async findByUserId(userId: string): Promise<Form[]> {
    const records = await db
      .select()
      .from(formsTable)
      .where(eq(formsTable.userId, userId))
      .orderBy(desc(formsTable.updatedAt));

    return records.map((record) => this.mapToDomain(record));
  }

  async update(form: Form): Promise<Form> {
    const records = await db
      .update(formsTable)
      .set({
        title: form.title,
        description: form.description,
        status: form.status,
        updatedAt: form.updatedAt,
      })
      .where(eq(formsTable.id, form.id))
      .returning();

    const record = records[0];

    if (!record) {
      throw new Error("Form not found");
    }

    return this.mapToDomain(record);
  }

  async delete(id: string): Promise<Form> {
    const records = await db
      .delete(formsTable)
      .where(eq(formsTable.id, id))
      .returning();

    const record = records[0];

    if (!record) {
      throw new Error("Form not found");
    }

    return this.mapToDomain(record);
  }
}

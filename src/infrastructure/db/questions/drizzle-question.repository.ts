import { eq } from "drizzle-orm";
import { db } from "../../../../db/db";
import { questionsTable } from "../../../../db/schema";
import type { IQuestionRepository } from "../../../application/ports/questions/question-repository.interface";
import {
  Question,
  type QuestionType,
} from "../../../domain/entities/questions/question.entity";

export class DrizzleQuestionRepository implements IQuestionRepository {
  private mapToDomain(record: typeof questionsTable.$inferSelect): Question {
    return new Question(
      record.id,
      record.formId,
      record.type as QuestionType,
      record.text,
      record.options as string[],
      record.createdAt,
    );
  }

  async save(question: Question): Promise<void> {
    await db.insert(questionsTable).values({
      id: question.id,
      formId: question.formId,
      type: question.type,
      text: question.text,
      options: question.options,
    });
  }

  async findByFormId(formId: string): Promise<Question[]> {
    const records = await db
      .select()
      .from(questionsTable)
      .where(eq(questionsTable.formId, formId));

    return records.map((record) => this.mapToDomain(record));
  }

  async findById(id: string): Promise<Question | null> {
    const records = await db
      .select()
      .from(questionsTable)
      .where(eq(questionsTable.id, id))
      .limit(1);

    return records[0] ? this.mapToDomain(records[0]) : null;
  }

  async update(question: Question): Promise<void> {
    await db
      .update(questionsTable)
      .set({
        text: question.text,
        type: question.type,
        options: question.options,
      })
      .where(eq(questionsTable.id, question.id));
  }

  async delete(id: string): Promise<void> {
    await db.delete(questionsTable).where(eq(questionsTable.id, id));
  }
}

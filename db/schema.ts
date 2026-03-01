import { pgTable, text, timestamp, jsonb, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const formStatusEnum = pgEnum("form_status", ["active", "closed"]);

export const questionTypeEnum = pgEnum("question_type", [
  "short_answer",
  "multiple_choice",
  "checkbox",
  "dropdown",
]);

export const usersTable = pgTable("users", {
  id: text("id").primaryKey(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const formsTable = pgTable("forms", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: formStatusEnum("status").default("active").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const questionsTable = pgTable("questions", {
  id: text("id").primaryKey(),
  formId: text("form_id")
    .notNull()
    .references(() => formsTable.id, { onDelete: "cascade" }),
  type: questionTypeEnum("type").notNull(),
  text: text("text").notNull(),
  options: jsonb("options").default([]).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  forms: many(formsTable),
}));

export const formsRelations = relations(formsTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [formsTable.userId],
    references: [usersTable.id],
  }),
  questions: many(questionsTable),
}));

export const questionsRelations = relations(questionsTable, ({ one }) => ({
  form: one(formsTable, {
    fields: [questionsTable.formId],
    references: [formsTable.id],
  }),
}));

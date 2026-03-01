import { Question } from "../../../domain/entities/questions/question.entity";

export interface IQuestionRepository {
  save(question: Question): Promise<void>;
  findByFormId(formId: string): Promise<Question[]>;
  findById(id: string): Promise<Question | null>;
  update(question: Question): Promise<void>;
  delete(id: string): Promise<void>;
}

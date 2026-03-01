import { Form } from "../../../domain/entities/forms/form.entity";

export interface IFormRepository {
  save(form: Form): Promise<void>;
  findAll(
    search?: string,
    status?: "active" | "closed",
    sortBy?: "asc" | "desc",
  ): Promise<Form[]>;
  findById(id: string): Promise<Form | null>;
  findByUserId(userId: string): Promise<Form[]>;
  update(form: Form): Promise<Form>;
  delete(id: string): Promise<Form>;
}

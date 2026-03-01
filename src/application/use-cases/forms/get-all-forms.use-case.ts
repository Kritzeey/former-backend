import { Form } from "../../../domain/entities/forms/form.entity";
import type { IFormRepository } from "../../ports/forms/forms-repository.interface";

export class GetAllFormsUseCase {
  constructor(private formRepository: IFormRepository) {}

  async execute(
    search?: string,
    status?: "active" | "closed",
    sortBy?: "asc" | "desc",
  ): Promise<Form[]> {
    return await this.formRepository.findAll(search, status, sortBy);
  }
}

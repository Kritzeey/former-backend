import type { Form } from "../../../domain/entities/forms/form.entity";
import type { IFormRepository } from "../../ports/forms/forms-repository.interface";

export class GetFormByIdUseCase {
  constructor(private formRepository: IFormRepository) {}

  async execute(id: string): Promise<Form | null> {
    return await this.formRepository.findById(id);
  }
}

import type { Form } from "../../../domain/entities/forms/form.entity";
import {
  NotFoundException,
  UnauthorizedException,
} from "../../../domain/exceptions/http.exception";
import type { IFormRepository } from "../../ports/forms/forms-repository.interface";

export class DeleteFormUseCase {
  constructor(private formRepository: IFormRepository) {}

  async execute(id: string, userId: string): Promise<Form> {
    const form = await this.formRepository.findById(id);

    if (!form) {
      throw new NotFoundException("Form not found");
    }

    if (form.userId !== userId) {
      throw new UnauthorizedException("You can only delete your own form");
    }

    return await this.formRepository.delete(id);
  }
}

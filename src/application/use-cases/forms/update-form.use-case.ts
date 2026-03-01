import { Form } from "../../../domain/entities/forms/form.entity";
import {
  NotFoundException,
  UnauthorizedException,
} from "../../../domain/exceptions/http.exception";
import type { IFormRepository } from "../../ports/forms/forms-repository.interface";
export class UpdateFormUseCase {
  constructor(private formRepository: IFormRepository) {}

  async execute(
    id: string,
    userId: string,
    newTitle: string,
    newDescription: string,
  ): Promise<Form> {
    const form = await this.formRepository.findById(id);

    if (!form) {
      throw new NotFoundException("Form not found");
    }

    if (form.userId !== userId) {
      throw new UnauthorizedException("You can only update your own form");
    }

    form.updateDetails(newTitle, newDescription);

    return await this.formRepository.update(form);
  }
}

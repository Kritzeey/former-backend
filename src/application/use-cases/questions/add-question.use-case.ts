import {
  type QuestionType,
  Question,
} from "../../../domain/entities/questions/question.entity";
import { BadRequestException } from "../../../domain/exceptions/http.exception";
import type { IQuestionRepository } from "../../ports/questions/question-repository.interface";

export class AddQuestionUseCase {
  constructor(private questionRepository: IQuestionRepository) {}

  async execute(params: {
    formId: string;
    type: QuestionType;
    text: string;
    options?: string[];
  }): Promise<Question> {
    const question = new Question(
      crypto.randomUUID(),
      params.formId,
      params.type,
      params.text,
      params.options || [],
    );

    await this.questionRepository.save(question);
    return question;
  }
}

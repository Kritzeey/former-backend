import type { Request, Response } from "express";
import type { AddQuestionUseCase } from "../../application/use-cases/questions/add-question.use-case";
import { BadRequestException } from "../../domain/exceptions/http.exception";

export class QuestionController {
  constructor(private addQuestionUseCase: AddQuestionUseCase) {}

  async add(req: Request, res: Response): Promise<void> {
    const formId = req.params.id;

    if (typeof formId !== "string") {
      throw new BadRequestException("Invalid ID parameter");
    }

    const { type, text, options } = req.body;

    if (!type || !text) {
      throw new BadRequestException("Question type and text are required.");
    }

    const question = await this.addQuestionUseCase.execute({
      formId,
      type,
      text,
      options,
    });

    res.status(201).json({
      message: "Question added successfully.",
      question,
    });
  }
}

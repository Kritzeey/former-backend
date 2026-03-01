import type { Request, Response } from "express";
import type { CreateFormUseCase } from "../../application/use-cases/forms/create-form.use-case";
import type { GetAllFormsUseCase } from "../../application/use-cases/forms/get-all-forms.use-case";
import type { GetFormByIdUseCase } from "../../application/use-cases/forms/get-form-by-id.use-case";
import type { UpdateFormUseCase } from "../../application/use-cases/forms/update-form.use-case";
import type { DeleteFormUseCase } from "../../application/use-cases/forms/delete-form.use-case";
import {
  BadRequestException,
  NotFoundException,
} from "../../domain/exceptions/http.exception";

export class FormController {
  constructor(
    private createFormUseCase: CreateFormUseCase,
    private getAllFormsUseCase: GetAllFormsUseCase,
    private getFormByIdUseCase: GetFormByIdUseCase,
    private updateFormUseCase: UpdateFormUseCase,
    private deleteFormUseCase: DeleteFormUseCase,
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    const { title, description } = req.body;

    if (!title || !description) {
      throw new BadRequestException("Title and description are required.");
    }

    const form = await this.createFormUseCase.execute(
      req.user!.id,
      title,
      description,
    );

    res.status(201).json({ message: "Form created successfully.", form });
  }

  async getAll(req: Request, res: Response): Promise<void> {
    const { search, status, sortBy } = req.query;

    const finalSearch = typeof search === "string" ? search : undefined;
    const finalStatus =
      status === "active" || status === "closed" ? status : undefined;
    const finalSortby =
      sortBy === "asc" || sortBy === "desc" ? sortBy : undefined;

    const forms = await this.getAllFormsUseCase.execute(
      finalSearch,
      finalStatus,
      finalSortby,
    );

    res.status(200).json({ message: "Forms fetched successfully", forms });
  }

  async getById(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    if (typeof id !== "string") {
      throw new BadRequestException("Invalid ID parameter");
    }

    const form = await this.getFormByIdUseCase.execute(id);

    if (!form) {
      throw new NotFoundException("Form not found");
    }

    res.status(200).json({ message: "Form fetched successfully", form });
  }

  async update(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const userId = req.user!.id;

    if (typeof id !== "string") {
      throw new BadRequestException("Invalid ID parameter");
    }

    const { title, description } = req.body;

    if (!title || !description) {
      throw new BadRequestException("Title and description are required.");
    }

    const form = await this.updateFormUseCase.execute(
      id,
      userId,
      title,
      description,
    );

    res.status(200).json({ message: "Form updated successfully", form });
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const userId = req.user!.id;

    if (typeof id !== "string") {
      throw new BadRequestException("Invalid ID parameter");
    }

    const form = await this.deleteFormUseCase.execute(id, userId);

    res.status(200).json({ message: `Form deleted successfully`, form });
  }
}

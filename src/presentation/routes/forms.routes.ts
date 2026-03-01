import { Router } from "express";
import { CreateFormUseCase } from "../../application/use-cases/forms/create-form.use-case";
import { DeleteFormUseCase } from "../../application/use-cases/forms/delete-form.use-case";
import { GetAllFormsUseCase } from "../../application/use-cases/forms/get-all-forms.use-case";
import { GetFormByIdUseCase } from "../../application/use-cases/forms/get-form-by-id.use-case";
import { UpdateFormUseCase } from "../../application/use-cases/forms/update-form.use-case";
import { FormController } from "../controllers/forms.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { DrizzleFormRepository } from "../../infrastructure/db/forms/drizzle-forms.repository";

const router = Router();

const formRepository = new DrizzleFormRepository();

const formController = new FormController(
  new CreateFormUseCase(formRepository),
  new GetAllFormsUseCase(formRepository),
  new GetFormByIdUseCase(formRepository),
  new UpdateFormUseCase(formRepository),
  new DeleteFormUseCase(formRepository),
);

router.get("/:id", (req, res) => formController.getById(req, res));
router.get("/", (req, res) => formController.getAll(req, res));
router.post("/", authMiddleware, (req, res) => formController.create(req, res));
router.put("/:id", authMiddleware, (req, res) =>
  formController.update(req, res),
);
router.delete("/:id", authMiddleware, (req, res) =>
  formController.delete(req, res),
);

export default router;

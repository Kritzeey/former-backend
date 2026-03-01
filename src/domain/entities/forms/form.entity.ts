import { Question } from "../questions/question.entity";

export class Form {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    private _title: string,
    private _description: string,
    public readonly createdAt: Date,
    private _updatedAt: Date,
    private _status: "active" | "closed" = "active",
    private _questions: Question[] = [],
  ) {}

  get questions(): Question[] {
    return [...this._questions];
  }

  public addQuestion(question: Question, responseCount: number): void {
    if (responseCount > 0) {
      throw new Error(
        "Cannot add questions to a form that already has responses.",
      );
    }

    this._questions.push(question);
    this._updatedAt = new Date();
  }
}

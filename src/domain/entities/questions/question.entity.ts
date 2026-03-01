export type QuestionType =
  | "short_answer"
  | "multiple_choice"
  | "checkbox"
  | "dropdown";

export class Question {
  constructor(
    public readonly id: string,
    public readonly formId: string,
    private _type: QuestionType,
    private _text: string,
    private _options: string[] = [],
    public readonly createdAt: Date = new Date(),
  ) {}

  get type(): QuestionType {
    return this._type;
  }

  get text(): string {
    return this._text;
  }

  get options(): string[] {
    return this._options;
  }

  public updateContent(
    text: string,
    type: QuestionType,
    options: string[],
  ): void {
    if (text.trim().length === 0) {
      throw new Error("Question text cannot be empty.");
    }

    if (
      ["multiple_choice", "checkbox", "dropdown"].includes(type) &&
      options.length === 0
    ) {
      throw new Error("Choice-based questions must have at least one option.");
    }

    this._text = text;
    this._type = type;
    this._options = options;
  }
}

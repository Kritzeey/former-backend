export type FormStatus = "active" | "closed";

export class Form {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    private _title: string,
    private _description: string,
    public readonly createdAt: Date,
    private _updatedAt: Date,
    private _status: FormStatus = "active",
  ) {}

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get status(): FormStatus {
    return this._status;
  }

  public updateDetails(title: string, description: string): void {
    if (title.trim().length === 0) {
      throw new Error("Form title cannot be empty.");
    }

    if (description.trim().length === 0) {
      throw new Error("Form description cannot be empty.");
    }

    this._title = title;
    this._description = description;
    this._updatedAt = new Date();
  }

  public closeForm(): void {
    this._status = "closed";
    this._updatedAt = new Date();
  }

  public activateForm(): void {
    this._status = "active";
    this._updatedAt = new Date();
  }
}

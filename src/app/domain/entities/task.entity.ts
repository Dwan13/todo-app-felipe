export class Task {
  constructor(
    public id: string,
    public title: string,
    public completed: boolean,
    public description?: string,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}
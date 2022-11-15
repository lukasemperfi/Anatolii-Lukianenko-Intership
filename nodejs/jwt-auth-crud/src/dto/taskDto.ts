import { Task } from "../db/models/task";

export class TaskDto {
  id: number;
  name: string;
  completed: boolean;

  constructor(model: Task) {
    this.id = model.id;
    this.name = model.name;
    this.completed = model.completed;
  }
}

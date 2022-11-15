import { Model } from "objection";

export class Task extends Model {
  static tableName = "task";

  id: number;
  name: string;
  completed: boolean;
  user_id: number;
}

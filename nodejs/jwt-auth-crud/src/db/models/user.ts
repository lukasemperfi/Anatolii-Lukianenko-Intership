import { Model } from "objection";

export class User extends Model {
  static tableName = "user";

  id: number;
  email: string;
  password: string;
}

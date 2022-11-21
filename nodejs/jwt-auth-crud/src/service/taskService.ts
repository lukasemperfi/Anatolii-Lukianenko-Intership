import { Task } from "../db/models/task";
import { TaskDto } from "../dto/taskDto";
import { ApiError } from "../exceptions/api-error";
import { updateTask } from "../queues/task-queue";

class TaskService {
  public getAll = async (user_id: number): Promise<Task[]> => {
    const tasks = await Task.query().where("user_id", user_id);

    return tasks;
  };

  public create = async (
    name: string,
    completed: boolean,
    user_id: number
  ): Promise<Task> => {
    const task = await Task.query().insertAndFetch({
      name,
      completed,
      user_id,
    });

    return task;
  };

  public update = async (taskInfo: TaskDto): Promise<void> => {
    await updateTask(taskInfo);
  };

  public delete = async (taskId: number): Promise<number> => {
    const task = await Task.query().findOne({ id: taskId });

    if (!task) {
      throw ApiError.BadRequest(`Task ${taskId} не найдена`);
    }
    const numDeleted = await Task.query().deleteById(taskId);

    return numDeleted;
  };
}

export const taskService = new TaskService();

import { Task } from "../db/models/task";
import { TaskDto } from "../dto/taskDto";
import { updateTask } from "../queues/task-queue";

class TaskService {
  public getAll = async (user_id: number) => {
    const tasks = await Task.query().where("user_id", user_id);

    return tasks;
  };

  public create = async (name: string, completed: boolean, user_id: number) => {
    const task = await Task.query().insertAndFetch({
      name,
      completed,
      user_id,
    });

    return task;
  };

  public update = async (taskInfo: TaskDto) => {
    await updateTask(taskInfo);
  };

  public delete = async (taskId: number) => {
    const task = await Task.query().findOne({ id: taskId });

    if (task) {
      console.log("from");

      const numDeleted = await Task.query().deleteById(taskId);

      return numDeleted;
    }
  };
}

export const taskService = new TaskService();

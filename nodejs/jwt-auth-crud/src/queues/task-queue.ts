import Queue from "bull";

import { TaskDto } from "../dto/taskDto";
import { taskProcess } from "./task-queue-consumer";

export const taskQueue = new Queue<TaskDto>("task");

taskQueue.process(taskProcess);

export const updateTask = async (task: TaskDto) => {
  await taskQueue.add(task, {
    delay: 60000,
  });
};

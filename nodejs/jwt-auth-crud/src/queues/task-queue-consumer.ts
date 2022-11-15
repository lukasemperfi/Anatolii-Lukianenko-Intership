import { Job } from "bull";

import { Task } from "../db/models/task";

export const taskProcess = async (job: Job) => {
  const taskInfo = job.data;

  const task = await Task.query().findOne({ id: taskInfo.id });

  if (task) {
    await Task.query().findOne({ id: taskInfo.id }).patch({
      name: taskInfo.name,
      completed: taskInfo.completed,
    });
  }
};

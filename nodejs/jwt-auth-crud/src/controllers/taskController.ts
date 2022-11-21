import { NextFunction, Request, Response } from "express";

import { TaskDto } from "../dto/taskDto";
import { taskService } from "../service/taskService";

class TaskController {
  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    const tasks = await taskService.getAll(req.user.id);

    return res.json(tasks);
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    const { name, completed } = req.body;
    const { id } = req.user;

    const task = await taskService.create(name, completed, id);

    return res.json(task);
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    const taskId = parseInt(req.params.id);

    const taskInfo = new TaskDto({ id: taskId, ...req.body });

    await taskService.update(taskInfo);

    return res.json({ MSG: "OK" });
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    const taskId = parseInt(req.params.id);

    const numDeleted = await taskService.delete(taskId);

    return res.json(numDeleted);
  };
}

export const taskController = new TaskController();

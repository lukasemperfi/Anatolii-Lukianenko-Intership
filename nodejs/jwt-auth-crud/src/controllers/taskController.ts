import { NextFunction, Request, Response } from "express";

import { TaskDto } from "../dto/taskDto";
import { taskService } from "../service/taskService";

class TaskController {
  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tasks = await taskService.getAll(req.user.id);

      return res.json(tasks);
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, completed } = req.body;
      const { id } = req.user;

      const task = await taskService.create(name, completed, id);

      return res.json(task);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskId = parseInt(req.params.id);

      const taskInfo = new TaskDto({ id: taskId, ...req.body });

      await taskService.update(taskInfo);

      return res.json({ MSG: "OK" });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskId = parseInt(req.params.id);

      const numDeleted = await taskService.delete(taskId);

      return res.json(numDeleted);
    } catch (error) {
      next(error);
    }
  };
}

export const taskController = new TaskController();

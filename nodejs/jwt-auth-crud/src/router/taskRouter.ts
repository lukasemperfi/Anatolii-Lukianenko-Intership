import express, { Router } from "express";

import { taskController } from "../controllers/taskController";
import { authCheck } from "../middleware/authCheck";
import { asyncHandler } from "../utils/asyncHandler";

export const createTaskRoutes = (): Router => {
  const taskRouter = express.Router();

  taskRouter.use(authCheck);

  taskRouter.get("/", asyncHandler(taskController.getAll));
  taskRouter.post("/", asyncHandler(taskController.create));
  taskRouter.patch("/:id", asyncHandler(taskController.update));
  taskRouter.delete("/:id", asyncHandler(taskController.delete));

  return taskRouter;
};

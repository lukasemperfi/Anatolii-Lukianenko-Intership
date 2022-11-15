import express from "express";

import { taskController } from "../controllers/taskController";
import { authCheck } from "../middleware/authCheck";

export const taskRouter = express.Router();

taskRouter.get("/", authCheck, taskController.getAll);
taskRouter.post("/", authCheck, taskController.create);
taskRouter.patch("/:id", taskController.update);
taskRouter.delete("/:id", authCheck, taskController.delete);

import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";

import { errorMiddleware } from "../middleware/error";
import { createAuthRoutes } from "../router/authRouter";
import { createTaskRoutes } from "../router/taskRouter";

export const createWebServer = (): Application => {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());
  app.use(cors());
  app.use("/auth", createAuthRoutes());
  app.use("/tasks", createTaskRoutes());
  app.use(errorMiddleware);

  return app;
};

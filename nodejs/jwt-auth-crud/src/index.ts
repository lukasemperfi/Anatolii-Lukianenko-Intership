import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { setupDb } from "./db/db-setup";
import { errorMiddleware } from "./middleware/error";
import { taskRouter } from "./router/taskRouter";
import { authRouter } from "./router/authRouter";
import { logger } from "./utils/logger";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/auth", authRouter);
app.use("/tasks", taskRouter);
app.use(errorMiddleware);

const start = async () => {
  try {
    setupDb();
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT}`);

      logger.info(`Server started on ${PORT}`);
    });
  } catch (err) {
    logger.error(err);
  }
};

start();

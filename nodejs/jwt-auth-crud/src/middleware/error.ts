import { NextFunction, Request, Response } from "express";

import { ApiError } from "../exceptions/api-error";
import { logger } from "../utils/logger";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    logger.error(
      `${err.status} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );

    return res.status(err.status).json({
      message: err.message,
      errors: err.errors,
    });
  }

  logger.error("500 - Непредвиденная ошибка");

  return res.status(500).json({
    message: "Непредвиденная ошибка",
  });
};

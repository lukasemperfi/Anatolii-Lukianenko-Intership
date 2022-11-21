import { Request, Response, NextFunction } from "express";
import * as yup from "yup";

import { ApiError } from "../../exceptions/api-error";

export const validate =
  (schema: yup.AnyObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (err: any) {
      return next(ApiError.BadRequest(err.message));
    }
  };

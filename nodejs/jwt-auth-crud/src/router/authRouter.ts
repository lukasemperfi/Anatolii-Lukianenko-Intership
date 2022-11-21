import express, { Router } from "express";

import { userController } from "../controllers/userController";
import { validate } from "../middleware/validation/validate";
import { userAuthSchema } from "../middleware/validation/userAuthSchema";
import { asyncHandler } from "../utils/asyncHandler";

export const createAuthRoutes = (): Router => {
  const authRouter = express.Router();

  authRouter.use(validate(userAuthSchema));

  authRouter.post("/registration", asyncHandler(userController.registration));
  authRouter.post("/login", asyncHandler(userController.login));
  authRouter.post("/logout", asyncHandler(userController.logout));
  authRouter.get("/refresh", asyncHandler(userController.refresh));

  return authRouter;
};

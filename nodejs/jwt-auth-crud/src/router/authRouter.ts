import express from "express";

import { userController } from "../controllers/userController";
import { body } from "express-validator";
import { authCheck } from "../middleware/authCheck";

export const authRouter = express.Router();

authRouter.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.registration
);
authRouter.post("/login", userController.login);
authRouter.post("/logout", userController.logout);
authRouter.get("/refresh", userController.refresh);

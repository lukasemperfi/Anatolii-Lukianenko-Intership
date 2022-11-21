import { NextFunction, Request, Response } from "express";

import { userService } from "../service/userService";

const cookieMaxAge = 30 * 24 * 60 * 60 * 1000;

class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const userData = await userService.registration(email, password);

    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: cookieMaxAge,
      httpOnly: true,
    });

    return res.json(userData);
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const userData = await userService.login(email, password);

    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: cookieMaxAge,
      httpOnly: true,
    });

    return res.json(userData);
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    const { refreshToken } = req.cookies;
    const token = await userService.logout(refreshToken);

    res.clearCookie("refreshToken");

    return res.json(token);
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    const { refreshToken } = req.cookies;
    const userData = await userService.refresh(refreshToken);

    res.cookie("refreshToken", userData?.refreshToken, {
      maxAge: cookieMaxAge,
      httpOnly: true,
    });

    return res.json(userData);
  }
}

export const userController = new UserController();

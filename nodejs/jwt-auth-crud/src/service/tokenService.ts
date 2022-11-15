import jwt from "jsonwebtoken";

import { Token } from "../db/models/token";
import { UserDto } from "../dto/userDto";

class TokenService {
  generateTokens(payload: UserDto) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET || "", {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET || "",
      { expiresIn: "30d" }
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET || "");

      return userData as UserDto;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET || "");

      return userData as UserDto;
    } catch (error) {
      return null;
    }
  }

  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await Token.query().findOne({ user_id: userId });

    if (tokenData) {
      const tokenNew = await Token.query()
        .findOne({ user_id: userId })
        .patch({ refreshToken: refreshToken });

      return tokenNew;
    }

    const token = await Token.query().insert({ user_id: userId, refreshToken });

    return token;
  }

  async removeToken(refreshToken: string) {
    const tokenData = await Token.query()
      .delete()
      .where("refreshToken", "=", refreshToken);

    return tokenData;
  }

  async findToken(refreshToken: string) {
    const tokenData = await Token.query().findOne({ refreshToken });

    return tokenData;
  }
}

export const tokenService = new TokenService();

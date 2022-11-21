import bcrypt from "bcrypt";

import { ApiError } from "../exceptions/api-error";
import { UserDto } from "../dto/userDto";
import { tokenService } from "./tokenService";
import { User } from "../db/models/user";

class UserService {
  async registration(email: string, password: string): Promise<UserDto> {
    const candidate = await User.query().findOne({ email });

    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }

    const hashPassword = await bcrypt.hash(password, 3);

    const user = await User.query().insertAndFetch({
      email,
      password: hashPassword,
    });

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, ...userDto };
  }

  async login(email: string, password: string): Promise<UserDto> {
    const user = await User.query().findOne({ email });

    if (!user) {
      throw ApiError.BadRequest(`Пользователь с ${email} не найден`);
    }

    const isPassEquals = bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw ApiError.BadRequest(`Неверный пароль`);
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, ...userDto };
  }

  async logout(refreshToken: string): Promise<number> {
    const numDeleted = await tokenService.removeToken(refreshToken);

    return numDeleted;
  }

  async refresh(refreshToken: string): Promise<UserDto> {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !!tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await User.query().findById(userData.id);

    if (!user) {
      throw ApiError.BadRequest(`Пользователь с не найден`);
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, ...userDto };
  }
}

export const userService = new UserService();

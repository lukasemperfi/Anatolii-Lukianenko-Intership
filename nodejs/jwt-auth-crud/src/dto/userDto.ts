export class UserDto {
  id: number;
  email: string;
  accessToken?: string;
  refreshToken?: string;

  constructor(model: UserDto) {
    this.id = model.id;
    this.email = model.email;
    this.accessToken = model.accessToken;
    this.refreshToken = model.refreshToken;
  }
}

import { UserModel, UserRequestModel } from '../models/user.model';

export class UserMapper {

  dtoToUser(user: any): UserModel {
    return {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      password: user?.password,
      rol: user?.rol,
    };
  }

  userToDto(user: any, message: string): UserRequestModel {
    return {
      user,
      message,
    };
  }
}

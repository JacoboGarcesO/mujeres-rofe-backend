import { UserCredentialsModel, UserCredentialsRequestModel, UserModel, UserRequestModel } from '../models/user.model';
import { encryptPassword } from '../utils/bcrypt';

export class UserMapper {
  dtoToUser(user: any): UserModel {
    const passwordEncrypted = encryptPassword(user?.password);

    return {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      password: passwordEncrypted,
      rol: user?.rol,
    };
  }

  userToDto(user: UserModel, message: string): UserRequestModel {
    return {
      user,
      message,
    };
  }

  dtoToUserCredentials(userCredentials: any): UserCredentialsModel {
    return {
      password: userCredentials?.password,
      email: userCredentials?.email,
    };
  }

  userCredentialsToDto(
    message: string,
    token?: string,
    user?: UserModel,
  ): UserCredentialsRequestModel {
    return {
      message,
      token,
      user,
    };
  }
}

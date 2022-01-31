import { UserCredentialsModel, UserCredentialsResponseModel as UserCredentialsResponseModel, UserModel, UserResponseModel as UserResponseModel } from '../models/user.model';
import { encryptPassword } from '../utils/bcrypt';

export class UserMapper {
  dtoToUser(user: any, image: any): UserModel {
    const passwordEncrypted = encryptPassword(user?.password);
   
    return {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      password: passwordEncrypted,
      rol: user?.rol,
      image: image && {
        _id: image?.public_id,
        url: image?.url,
      },
    };
  }

  userToDto(users: UserModel, message: string): UserResponseModel {
    return {
      users: [users],
      message,
    };
  }

  usersToDto(users: UserModel[], message: string): UserResponseModel {
    return {
      users,
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
  ): UserCredentialsResponseModel {
    return {
      message,
      token,
      user,
    };
  }
}

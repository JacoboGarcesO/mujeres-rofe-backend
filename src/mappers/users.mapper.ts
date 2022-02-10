import { UserCredentialsModel, UserCredentialsResponseModel, UserModel, UserResponseModel } from '../models/user.model';
import { encryptPassword } from '../utils/bcrypt';

export class UserMapper {
  dtoToUserUpdate(user: any, image: any): UserModel {  
    return {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      rol: user?.rol,
      description: user?.description,
      document: user?.document,
      hobbies: JSON.parse(user?.hobbies),
      socialsNetworks: JSON.parse(user?.socialsNetworks),
      phoneNumber: user.phoneNumber,
      isPending: user?.isPending !== 'false',
      location: JSON.parse(user?.location),
      image: image && {
        _id: image?.public_id,
        url: image?.url,
      },
      id: user?.id,
    };
  }

  dtoToCreateUser(user: any): UserModel {
    const passwordEncrypted = encryptPassword(user?.password);
  
    return {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      password: passwordEncrypted,
      rol: user?.rol,
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

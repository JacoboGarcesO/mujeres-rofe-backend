import { UserCredentialsModel, UserCredentialsResponseModel, UserModel, UserResponseModel } from '../models/user.model';

export class UserMapper {
  dtoToUser(user: any, image: any): UserModel {  
    return {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      rol: user?.rol,
      description: user?.description,
      document: user?.document,
      hobbies: JSON.parse(user?.hobbies),
      password: user?.firstName + user?.document,
      socialsNetworks: JSON.parse(user?.socialsNetworks),
      phoneNumber: user?.phoneNumber,
      isPremium: user?.isPremium?.startsWith('true'),
      location: JSON.parse(user?.location),
      image: image && {
        _id: image?.public_id,
        url: image?.url,
      },
      id: user?.id,
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

import { UploadApiResponse } from 'cloudinary';
import { UserCredentialsModel, UserCredentialsResponseModel, UserModel, UserResponseModel } from '../models/user.model';
import { encryptPassword } from '../utils/bcrypt';

export class UserMapper {
  dtoToUser(user: any, image: UploadApiResponse | undefined, documentImage: UploadApiResponse | undefined): UserModel {
    const password = encryptPassword(user?.firstName.charAt(0).toUpperCase() + user?.lastName.charAt(0).toLowerCase() + user?.document);

    return {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      rol: user?.rol,
      description: user?.description,
      document: user?.document,
      hobbies: JSON.parse(user?.hobbies),
      password,
      socialsNetworks: JSON.parse(user?.socialsNetworks),
      phoneNumber: user?.phoneNumber,
      isPremium: user?.isPremium?.startsWith('true'),
      location: JSON.parse(user?.location),
      image: {
        _id: image?.public_id,
        url: image?.url,
        type: image?.format,
      },
      id: user?.id,
      address: user?.address,
      age: user?.age,
      disclosure: user?.disclosure,
      documentImage: {
        _id: documentImage?.public_id,
        url: documentImage?.url,
        type: documentImage?.format,
      },
      documentType: user?.documentType,
      education: user?.education,
      ethnicGroup: user?.education,
      familyCore: user?.familyCore,
      familyIncome: user?.familyIncome,
      housingType: user?.familyIncome,
      maritalStatus: user?.maritalStatus,
      promocionalCode: user?.promocionalCode,
      stratum: user?.stratum,
      sustaining: user?.sustaining,
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

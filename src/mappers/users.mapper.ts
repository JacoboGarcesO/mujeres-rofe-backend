import { UploadApiResponse } from 'cloudinary';
import { MediaModel } from '../models/media.model';
import {
  UserCredentialsModel,
  UserCredentialsResponseModel,
  UserModel,
  UserResponseModel,
  UserPaginatedResponseModel,
} from '../models/user.model';
import { encryptPassword } from '../utils/bcrypt';

export class UserMapper {
  dtoToUser(
    user: any,
    image: UploadApiResponse | undefined,
    documentImage: UploadApiResponse | undefined,
  ): UserModel {
    const password = encryptPassword(
      user?.firstName.charAt(0).toUpperCase() +
        user?.lastName.charAt(0).toLowerCase() +
        user?.document,
    );

    return {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email?.toLowerCase(),
      rol: user?.rol,
      description: user?.description,
      documentNumber: user?.document,
      hobbies: JSON.parse(user?.hobbies),
      password,
      socialsNetworks: JSON.parse(user?.socialsNetworks),
      phoneNumber: user?.phoneNumber,
      isPremium: user?.isPremium?.startsWith('true'),
      location: JSON.parse(user?.location),
      image: this.getMedia(image, JSON.parse(user?.imageEncoded || '{}')),
      id: user?.id,
      address: user?.address,
      age: user?.age,
      disclosure: user?.disclosure,
      documentImage: this.getMedia(
        documentImage,
        JSON.parse(user?.documentImageEncoded || '{}'),
      ),
      documentType: user?.documentType,
      education: user?.education,
      ethnicGroup: JSON.parse(user?.ethnicGroup),
      familyCore: user?.familyCore,
      familyIncome: user?.familyIncome,
      housingType: user?.housingType,
      maritalStatus: user?.maritalStatus,
      promocionalCode: user?.promocionalCode,
      stratum: user?.stratum,
      sustaining: JSON.parse(user?.sustaining),
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

  usersPaginatedToDto(
    users: UserModel[],
    total: number,
    message: string,
  ): UserPaginatedResponseModel {
    return {
      users,
      total,
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

  private getMedia(
    newMedia: UploadApiResponse | undefined,
    media: MediaModel,
  ): MediaModel {
    if (!!media && !newMedia) {
      return media;
    }

    return {
      _id: newMedia?.public_id,
      url: newMedia?.secure_url,
      type: newMedia?.format,
    };
  }
}

import { UploadApiResponse } from 'cloudinary';
import { IUser, IUserCredentials } from '../../core/interfaces/user.interface';
import { encryptPassword } from '../../core/utils/bcrypt';
import { getMedia } from '../../core/utils/get-media.util';

export class UserMapper {
  toUser(
    data: any,
    image: UploadApiResponse | undefined,
    documentImage: UploadApiResponse | undefined,
  ): IUser {
    const password = encryptPassword(data?.firstName, data?.lastName, data?.document);

    return {
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email?.toLowerCase(),
      rol: data?.rol,
      description: data?.description,
      documentNumber: data?.document,
      hobbies: JSON.parse(data?.hobbies),
      password,
      socialsNetworks: JSON.parse(data?.socialsNetworks),
      phoneNumber: data?.phoneNumber,
      isPremium: data?.isPremium?.startsWith('true'),
      location: JSON.parse(data?.location),
      image: getMedia(image, JSON.parse(data?.imageEncoded || '{}')),
      id: data?.id,
      address: data?.address,
      age: data?.age,
      disclosure: data?.disclosure,
      documentImage: getMedia(documentImage, JSON.parse(data?.documentImageEncoded || '{}')),
      documentType: data?.documentType,
      education: data?.education,
      ethnicGroup: JSON.parse(data?.ethnicGroup),
      familyCore: data?.familyCore,
      familyIncome: data?.familyIncome,
      housingType: data?.housingType,
      maritalStatus: data?.maritalStatus,
      promocionalCode: data?.promocionalCode,
      stratum: data?.stratum,
      sustaining: JSON.parse(data?.sustaining),
      hasAcceptTermsAndConditions: data?.hasAcceptTermsAndConditions,
    };
  }

  toUserCredentials(data: any): IUserCredentials {
    return {
      password: data?.password,
      email: data?.email,
    };
  }
}

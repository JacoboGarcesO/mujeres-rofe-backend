import { LocationModel } from './locations.model';
import { MediaModel } from './media.model';

export interface UserModel { 
  firstName: string;
  lastName: string;
  email: string;
  rol: string;
  documentNumber: string;
  password: string;
  image: MediaModel;
  id: string;
  description: string;
  socialsNetworks: SocialNetworksModel[]; 
  hobbies: string[];
  phoneNumber: number;
  isPremium: boolean;
  location: LocationModel;
  documentType: string,
  maritalStatus: string,
  address: string,
  age: string,
  familyCore: string,
  familyIncome: string,
  housingType: string,
  education: string,
  stratum: string,
  promocionalCode: string,
  disclosure: string,
  ethnicGroup: string[],
  sustaining: string[],
  documentImage: MediaModel,
  creationDate?: Date;
}

export interface UserResponseModel {
  users: UserModel[];
  message: string;
}

export interface UserCredentialsModel {
  email: string;
  password: string;
}

export interface UserCredentialsResponseModel {
  message: string;
  token?: string;
  user?: UserModel;
}

export interface SocialNetworksModel {
  name: string;
  url: string;
}

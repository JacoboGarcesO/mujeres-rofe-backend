import { ILocation } from './locations.interface';
import { IMedia } from './media.interface';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  rol: string;
  documentNumber: string;
  password: string;
  image: IMedia;
  id: string;
  description: string;
  socialsNetworks: ISocialNetworks[];
  hobbies: string[];
  phoneNumber: number;
  isPremium: boolean;
  location: ILocation;
  documentType: string;
  maritalStatus: string;
  address: string;
  age: string;
  familyCore: string;
  familyIncome: string;
  housingType: string;
  education: string;
  stratum: string;
  promocionalCode: string;
  disclosure: string;
  ethnicGroup: string[];
  sustaining: string[];
  documentImage: IMedia;
  hasAcceptTermsAndConditions: boolean;
  creationDate?: Date;
}

export interface IUserCredentials {
  email: string;
  password: string;
}

export interface ISocialNetworks {
  name: string;
  url: string;
}

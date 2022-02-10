import { LocationModel } from './locations.model';
import { MediaModel } from './media.model';

export interface UserModel { 
  firstName: string;
  lastName: string;
  email: string;
  rol: string;
  password?: string;
  image?: MediaModel;
  id?: string;
  description?: string;
  socialsNetworks?: SocialNetworksModel[]; 
  hobbies?: string[];
  phoneNumber?: number;
  isPending?: boolean;
  document?: string;
  location?: LocationModel;
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

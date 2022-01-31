import { ImageModel } from './image.model';

export interface UserModel { 
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rol: string;
  image?: ImageModel;
}

export interface UserRequestModel {
  user: UserModel;
  message: string;
}

export interface UserCredentialsModel {
  email: string;
  password: string;
}

export interface UserCredentialsRequestModel {
  message: string;
  token?: string;
  user?: UserModel;
}

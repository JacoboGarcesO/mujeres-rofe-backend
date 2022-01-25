export interface UserModel { 
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rol: string;
}

export interface UserRequestModel {
  user: UserModel;
  message: string;
}

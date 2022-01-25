import { UserModel } from '../../models/user.model';

export class UserMapper {

  dtoToUserMapper(user: UserModel): UserModel {
    return user;
  }
}

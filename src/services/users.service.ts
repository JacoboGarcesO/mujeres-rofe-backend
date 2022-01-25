import usersCollection from '../collections/users.collection';
import { UserMapper } from '../mappers/users/dto-to-users.mapper';
import { UserModel } from '../models/user.model';

export class UserService {

  private userMapper: UserMapper;

  constructor(mapper: UserMapper) { this.userMapper = mapper; }
  
  async create(userDto: UserModel): Promise<UserModel> {
    const user = this.userMapper.dtoToUserMapper(userDto);
    const userToCreate = new usersCollection(user);
    const userSaved = await userToCreate.save();

    return userSaved;
  }
}

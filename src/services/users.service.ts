import usersCollection from '../collections/users.collection';
import { UserMapper } from '../mappers/users.mapper';
import { UserRequestModel } from '../models/user.model';
import messages from '../utils/messages';

export class UserService {
  private userMapper: UserMapper;

  constructor(mapper: UserMapper) { this.userMapper = mapper; }
  
  async create(userDto: any): Promise<UserRequestModel> {
    const user = this.userMapper.dtoToUser(userDto);
    const userCreated = await new usersCollection(user).save();
    const userRequest = this.userMapper.userToDto(userCreated, messages.createSuccess('user'));

    return userRequest;
  }
}

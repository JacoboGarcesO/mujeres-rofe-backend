import usersCollection from '../collections/users.collection';
import { UserMapper } from '../mappers/users.mapper';
import { UserCredentialsRequestModel, UserRequestModel } from '../models/user.model';
import messages from '../utils/messages';
import Jwt from 'jsonwebtoken';
import environment from '../config/environment';
import { comparePasswords } from '../utils/bcrypt';

export class UserService {
  private userMapper: UserMapper;

  constructor(mapper: UserMapper) { this.userMapper = mapper; }

  async auth(userCredentials: any): Promise<UserCredentialsRequestModel> {
    const credentials = this.userMapper.dtoToUserCredentials(userCredentials);
    const user = await usersCollection.findOne({ email: credentials.email });

    if (!user) {
      return this.userMapper.userCredentialsToDto(messages.userNotFound);
    }

    if (comparePasswords(credentials?.password, user?.password)) {
      const token = Jwt.sign(credentials, environment.jwtPassword);
      return this.userMapper.userCredentialsToDto(messages.authSuccess, token, user);
    }

    return this.userMapper.userCredentialsToDto(messages.authFailure);
  }

  async create(userDto: any): Promise<UserRequestModel> {
    const user = this.userMapper.dtoToUser(userDto);
    const userCreated = await new usersCollection(user).save();
    const userRequest = this.userMapper.userToDto(userCreated, messages.createSuccess('user'));

    return userRequest;
  }
}

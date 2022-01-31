import usersCollection from '../collections/users.collection';
import { UserMapper } from '../mappers/users.mapper';
import { UserCredentialsResponseModel, UserModel, UserResponseModel } from '../models/user.model';
import messages from '../utils/messages';
import Jwt from 'jsonwebtoken';
import environment from '../config/environment';
import { comparePasswords } from '../utils/bcrypt';
import cloudinary from '../config/cloudinary';
import { MessagesMapper } from '../mappers/messages.mapper';
import { MessageModel } from '../models/message.model';

export class UserService {
  private userMapper: UserMapper;
  private messageMapper: MessagesMapper;

  constructor(mapper: UserMapper, messageMapper: MessagesMapper) {
    this.userMapper = mapper;
    this.messageMapper = messageMapper;
  }

  async auth(userCredentials: any): Promise<UserCredentialsResponseModel> {
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

  async create(userDto: any, userImage: any): Promise<UserResponseModel> {
    let image;

    if (userImage) {
      image = await cloudinary.upload(userImage);
    }

    const user = this.userMapper.dtoToUser(userDto, image);
    const userCreated = await new usersCollection(user).save();
    const userRequest = this.userMapper.userToDto(userCreated, messages.createSuccess('user'));

    return userRequest;
  }

  async getAll(): Promise<UserResponseModel | MessageModel> {
    const users: UserModel[] = await usersCollection.find();  

    if (!users?.length) {
      return this.messageMapper.map(messages.getAllFailure('users'));
    }

    return this.userMapper.usersToDto(users, messages.getAll('users'));
  }

  async getById(userId: any): Promise<UserResponseModel | MessageModel> {
    const user: UserModel = await usersCollection.findById(userId);

    if (!user) {
      return this.messageMapper.map(messages.getByIdFailure('user'));
    }

    return this.userMapper.userToDto(user, messages.getById('user'));
  }
}

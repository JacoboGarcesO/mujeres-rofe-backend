import usersCollection from '../collections/users.collection';
import { UserMapper } from '../mappers/users.mapper';
import { UserCredentialsResponseModel, UserModel, UserResponseModel } from '../models/user.model';
import messages from '../utils/messages';
import Jwt from 'jsonwebtoken';
import environment from '../config/environment';
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

    if (credentials?.password === user?.password) {
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
    const userResponse = this.userMapper.userToDto(userCreated, messages.createSuccess('user'));

    return userResponse;
  }

  async getAll(): Promise<UserResponseModel | MessageModel> {
    const users: UserModel[] = await usersCollection.find();

    if (!users?.length) {
      return this.messageMapper.map(messages.getAllFailure('users'));
    }

    return this.userMapper.usersToDto(users, messages.getAll('users'));
  }

  async getById(userId: any): Promise<UserResponseModel | MessageModel> {
    const user = await usersCollection.findById(userId);

    if (!user) {
      return this.messageMapper.map(messages.getByIdFailure('user'));
    }

    return this.userMapper.userToDto(user, messages.getById('user'));
  }

  async update(userDto: any, userImage: any): Promise<UserResponseModel | MessageModel> {
    let image;

    if (userImage) {
      if (userDto?.image) {
        await cloudinary.destroy(userDto.image._id);
      }

      image = await cloudinary.upload(userImage);
    }

    const user = this.userMapper.dtoToUser(userDto, image);
    const userUpdated = await usersCollection.findByIdAndUpdate(user?.id, { $set: user }, { new: true });
    const userResponse = this.userMapper.userToDto(userUpdated, messages.updateSuccess('user'));
    return userResponse;
  }

  async delete(userId: any): Promise<MessageModel> {
    const user = await usersCollection.findByIdAndDelete(userId);

    if (!user) {
      return this.messageMapper.map(messages.deleteFailure('user'));
    }

    await cloudinary.destroy(user?.image?._id);

    return this.userMapper.userToDto(user, messages.deleteSuccess('user'));
  }
}

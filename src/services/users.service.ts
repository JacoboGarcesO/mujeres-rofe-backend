import usersCollection from '../collections/users.collection';
import { UserMapper } from '../mappers/users.mapper';
import {
  UserCredentialsResponseModel,
  UserModel,
  UserResponseModel,
  UserPaginatedResponseModel,
} from '../models/user.model';
import messages from '../utils/messages';
import Jwt from 'jsonwebtoken';
import environment from '../config/environment';
import cloudinary from '../config/cloudinary';
import { MessagesMapper } from '../mappers/messages.mapper';
import { MessageModel } from '../models/message.model';
import { comparePasswords } from '../utils/bcrypt';
import { EmailsService } from './emails.service';

const emailsService = new EmailsService();
export class UserService {
  private userMapper: UserMapper;
  private messageMapper: MessagesMapper;

  constructor(mapper: UserMapper, messageMapper: MessagesMapper) {
    this.userMapper = mapper;
    this.messageMapper = messageMapper;
  }

  async auth(userCredentials: any): Promise<UserCredentialsResponseModel> {
    const credentials = this.userMapper.dtoToUserCredentials(userCredentials);
    const user = await usersCollection.findOne({
      email: credentials.email.toLowerCase(),
    });

    if (!user) {
      return this.userMapper.userCredentialsToDto(messages.userNotFound);
    }

    if (comparePasswords(credentials?.password, user?.password)) {
      const token = Jwt.sign(credentials, environment.jwtPassword);
      return this.userMapper.userCredentialsToDto(
        messages.authSuccess,
        token,
        user,
      );
    }

    return this.userMapper.userCredentialsToDto(messages.authFailure);
  }

  async create(
    userDto: any,
    userMedia: any,
  ): Promise<UserResponseModel | MessageModel> {
    const emailExisting = await usersCollection.findOne({
      email: userDto?.email?.toLowerCase(),
    });

    if (emailExisting) {
      throw new Error(this.messageMapper.map(messages.emailDuplicate).message);
    }

    const documentExisting = await usersCollection.findOne({
      documentNumber: userDto?.document,
    });

    if (documentExisting) {
      throw new Error(
        this.messageMapper.map(messages.documentDuplicate).message,
      );
    }

    await emailsService.send(
      userDto,
      'Confirma tu cuenta de Mujeres ROFÉ',
      'register',
      '¡Tu cuenta ha sido creada exitosamente!',
    );

    let image;
    let documentImage;

    if (userMedia?.image?.[0] && userMedia?.documentImage?.[0]) {
      image = await cloudinary.upload(userMedia?.image?.[0]?.path);
      documentImage = await cloudinary.upload(
        userMedia?.documentImage?.[0]?.path,
      );
    }

    const user = this.userMapper.dtoToUser(userDto, image, documentImage);
    const userCreated = await new usersCollection(user).save();
    const userResponse = this.userMapper.userToDto(
      userCreated,
      messages.createSuccess('user'),
    );

    return userResponse;
  }

  async getAll(): Promise<UserResponseModel | MessageModel> {
    const users: UserModel[] = await usersCollection
      .find()
      .sort({ firstName: 1 });

    if (!users?.length) {
      return this.messageMapper.map(messages.getAllFailure('users'));
    }

    return this.userMapper.usersToDto(users, messages.getAll('users'));
  }

  async getPaginatedUsers(
    from: number,
  ): Promise<UserPaginatedResponseModel | MessageModel> {
    const [users, total] = await Promise.all([
      usersCollection.find().skip(from).limit(10).sort({ _id: -1 }),
      usersCollection.countDocuments(),
    ]);

    if (!users) {
      return this.messageMapper.map(messages.getAllFailure('users'));
    }

    return this.userMapper.usersPaginatedToDto(
      users,
      total,
      messages.getAll('users'),
    );
  }

  async getById(userId: any): Promise<UserResponseModel | MessageModel> {
    const user = await usersCollection.findById(userId);

    if (!user) {
      return this.messageMapper.map(messages.getByIdFailure('user'));
    }

    return this.userMapper.userToDto(user, messages.getById('user'));
  }

  async update(
    userDto: any,
    userMedia: any,
  ): Promise<UserResponseModel | MessageModel> {
    let image;
    let documentImage;

    if (userMedia?.image) {
      if (userDto.image?._id) {
        await cloudinary.destroy(userDto?.image?._id);
      }

      image = await cloudinary.upload(userMedia?.image?.[0]?.path);
    }

    if (userMedia?.documentImage) {
      if (userDto.documentImage?._id) {
        await cloudinary.destroy(userDto.documentImage._id);
      }

      documentImage = await cloudinary.upload(
        userMedia?.documentImage?.[0]?.path,
      );
    }

    const user = this.userMapper.dtoToUser(userDto, image, documentImage);
    const userUpdated = await usersCollection.findByIdAndUpdate(
      user?.id,
      { $set: user },
      { new: true },
    );
    const userResponse = this.userMapper.userToDto(
      userUpdated,
      messages.updateSuccess('user'),
    );
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

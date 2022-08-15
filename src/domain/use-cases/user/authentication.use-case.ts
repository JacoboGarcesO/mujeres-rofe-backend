import Jwt from 'jsonwebtoken';
import { environment } from '../../../core/config/environment';
import { IResponse } from '../../../core/interfaces/response.interface';
import { IUser } from '../../../core/interfaces/user.interface';
import { comparePasswords } from '../../../core/utils/bcrypt';
import { messages } from '../../../core/utils/messages';
import { ResponseMapper } from '../../mappers/response.mapper';
import { UserRepository } from '../../repositories/user.repository';

export class AuthenticationUseCase {
  private repository: UserRepository;
  private responseMapper: ResponseMapper<IUser>;

  constructor(
    repository: UserRepository,
    responseMapper: ResponseMapper<IUser>,
  ) {
    this.repository = repository;
    this.responseMapper = responseMapper;
  }

  public async execute(data: any): Promise<IResponse<IUser>> {
    const user = await this.repository.getUserByEmail(data?.email?.toLowerCase());

    if (!user) {
      return this.responseMapper.toResponse(null, messages.userNotFound);
    }

    if(comparePasswords(data?.password, user.password)) {
      const token = Jwt.sign(JSON.stringify(user), environment.jwtPassword);
      return this.responseMapper.toResponse(user, messages.authSuccess, token);
    }

    return this.responseMapper.toResponse(null, messages.authFailure);
  }

}

import { IResponse } from '../../../core/interfaces/response.interface';
import { IUser } from '../../../core/interfaces/user.interface';
import { messages } from '../../../core/utils/messages';
import { ResponseMapper } from '../../mappers/response.mapper';
import { UserRepository } from '../../repositories/user.repository';

export class GetUserByIdUseCase {
  private repository: UserRepository;
  private responseMapper: ResponseMapper<IUser>;

  constructor(
    repository: UserRepository,
    responseMapper: ResponseMapper<IUser>,
  ) {
    this.repository = repository;
    this.responseMapper = responseMapper;
  }

  public async execute(userId: string): Promise<IResponse<IUser>> {
    const user = await this.repository.getUserById(userId);

    if (!user) {
      return this.responseMapper.toResponse(null, messages.getByIdFailure('user'));
    }

    return this.responseMapper.toResponse(user, messages.getById('user'));
  }
}

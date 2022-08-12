import { IResponse } from '../../../core/interfaces/response.interface';
import { messages } from '../../../core/utils/messages';
import { ResponseMapper } from '../../mappers/response.mapper';
import { UserRepository } from '../../repositories/user.repository';

export class GetTotalUsersUseCase {
  private repository: UserRepository;
  private responseMapper: ResponseMapper<number>;

  constructor(
    repository: UserRepository,
    responseMapper: ResponseMapper<number>,
  ) {
    this.repository = repository;
    this.responseMapper = responseMapper;
  }

  public async execute(): Promise<IResponse<number>> {
    const total = await this.repository.getTotalUsers();

    return this.responseMapper.toResponse(total, messages.getAll('users'));
  }
}

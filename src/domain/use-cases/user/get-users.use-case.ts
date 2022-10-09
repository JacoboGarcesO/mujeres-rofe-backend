import { IResponse } from '../../../core/interfaces/response.interface';
import { IUser } from '../../../core/interfaces/user.interface';
import { messages } from '../../../core/utils/messages';
import { FilterMapper } from '../../mappers/filter.mapper';
import { ResponseMapper } from '../../mappers/response.mapper';
import { UserRepository } from '../../repositories/user.repository';

export class GetUsersUseCase {
  private repository: UserRepository;
  private filterMapper: FilterMapper;
  private responseMapper: ResponseMapper<IUser[]>;

  constructor(
    repository: UserRepository,
    filterMapper: FilterMapper,
    responseMapper: ResponseMapper<IUser[]>,
  ) {
    this.repository = repository;
    this.filterMapper = filterMapper;
    this.responseMapper = responseMapper;
  }

  public async execute(data: any): Promise<IResponse<IUser[]>> {
    const filter = this.filterMapper.toFilter(data);
    const total = await this.repository.getTotalUsers(filter.term);
    const users = await this.repository.getUsers(filter);

    if (!users?.length) {
      return this.responseMapper.toResponse(null, messages.getAllFailure('users'));
    }

    return this.responseMapper.toResponse(
      users,
      messages.getAll('users'),
      undefined,
      { ...filter, total: total, term: this.filterMapper.toTerm(filter.term) }
    );
  }
}

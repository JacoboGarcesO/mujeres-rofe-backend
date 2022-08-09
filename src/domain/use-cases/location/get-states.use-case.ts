import { IState } from '../../../core/interfaces/locations.interface';
import { IResponse } from '../../../core/interfaces/response.interface';
import { messages } from '../../../core/utils/messages';
import { ResponseMapper } from '../../mappers/response.mapper';
import { StateRepository } from '../../repositories/state.repository';

export class GetStatesUseCase {
  private repository: StateRepository;
  private responseMapper: ResponseMapper<IState[]>;

  constructor(
    repository: StateRepository,
    responseMapper: ResponseMapper<IState[]>,
  ) {
    this.repository = repository;
    this.responseMapper = responseMapper;
  }

  public async execute(): Promise<IResponse<IState[]>> {
    const cities = await this.repository.getStates();

    if (!cities?.length) {
      return this.responseMapper.toResponse(null, messages.getAllFailure('states'));
    }

    return this.responseMapper.toResponse(cities, messages.getAll('states'));
  }
}

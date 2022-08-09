import { IState } from '../../../core/interfaces/locations.interface';
import { IResponse } from '../../../core/interfaces/response.interface';
import { messages } from '../../../core/utils/messages';
import { ResponseMapper } from '../../mappers/response.mapper';
import { HighlightedCityRepository } from '../../repositories/highlighted-city.repository';

export class GetHighlightedCitiesUseCase {
  private repository: HighlightedCityRepository;
  private responseMapper: ResponseMapper<IState[]>;

  constructor(
    repository: HighlightedCityRepository,
    responseMapper: ResponseMapper<IState[]>,
  ) {
    this.repository = repository;
    this.responseMapper = responseMapper;
  }

  public async execute(): Promise<IResponse<IState[]>> {
    const highlightedCities = await this.repository.getHighlightedCities();

    if (!highlightedCities?.length) {
      return this.responseMapper.toResponse(null, messages.getAllFailure('highlighted cities'));
    }

    return this.responseMapper.toResponse(highlightedCities, messages.getAll('highlighted cities'));
  }
}

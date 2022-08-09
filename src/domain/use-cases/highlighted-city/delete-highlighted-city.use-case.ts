import { IState } from '../../../core/interfaces/locations.interface';
import { IResponse } from '../../../core/interfaces/response.interface';
import { messages } from '../../../core/utils/messages';
import { ResponseMapper } from '../../mappers/response.mapper';
import { HighlightedCityRepository } from '../../repositories/highlighted-city.repository';

export class DeleteHighlightedCityUseCase {
  private repository: HighlightedCityRepository;
  private responseMapper: ResponseMapper<IState>;

  constructor(
    repository: HighlightedCityRepository,
    responseMapper: ResponseMapper<IState>,
  ) {
    this.repository = repository;
    this.responseMapper = responseMapper;
  }

  public async execute(highlightedCityId: string): Promise<IResponse<IState>> {
    const highlightedCity = await this.repository.deleteHighlightedCity(highlightedCityId);

    if (!highlightedCity) {
      return this.responseMapper.toResponse(null, messages.deleteFailure('highlighted city'));
    }

    return this.responseMapper.toResponse(highlightedCity, messages.deleteSuccess('highlighted city'));
  }
}

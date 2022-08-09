import { IState } from '../../../core/interfaces/locations.interface';
import { IResponse } from '../../../core/interfaces/response.interface';
import { messages } from '../../../core/utils/messages';
import { HighlightedCityMapper } from '../../mappers/highlighted-city.mapper';
import { ResponseMapper } from '../../mappers/response.mapper';
import { HighlightedCityRepository } from '../../repositories/highlighted-city.repository';

export class CreateHighlightedCityUseCase {
  private repository: HighlightedCityRepository;
  private responseMapper: ResponseMapper<IState>;
  private highlightedCityMapper: HighlightedCityMapper;

  constructor(
    repository: HighlightedCityRepository,
    responseMapper: ResponseMapper<IState>,
    highlightedCityMapper: HighlightedCityMapper,
  ) {
    this.repository = repository;
    this.responseMapper = responseMapper;
    this.highlightedCityMapper = highlightedCityMapper;
  }

  public async execute(data: any): Promise<IResponse<IState>> {
    const highlightedCity = this.highlightedCityMapper.toHighlightedCity(data);
    const highlightedCityCreated = await this.repository.createHighlightedCity(highlightedCity);
    return this.responseMapper.toResponse(highlightedCityCreated, messages.createSuccess('highlighted city'));
  }
}

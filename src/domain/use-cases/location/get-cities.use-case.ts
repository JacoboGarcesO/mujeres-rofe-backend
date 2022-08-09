import { ICity } from '../../../core/interfaces/locations.interface';
import { IResponse } from '../../../core/interfaces/response.interface';
import { messages } from '../../../core/utils/messages';
import { ResponseMapper } from '../../mappers/response.mapper';
import { CityRepository } from '../../repositories/city.repository';

export class GetCitiesUseCase {
  private repository: CityRepository;
  private responseMapper: ResponseMapper<ICity[]>;

  constructor(
    repository: CityRepository,
    responseMapper: ResponseMapper<ICity[]>,
  ) {
    this.repository = repository;
    this.responseMapper = responseMapper;
  }

  public async execute(): Promise<IResponse<ICity[]>> {
    const cities = await this.repository.getCities({});

    if (!cities?.length) {
      return this.responseMapper.toResponse(null, messages.getAllFailure('cities'));
    }

    return this.responseMapper.toResponse(cities, messages.getAll('cities'));
  }
}

import { IRequest } from '../../../core/interfaces/requests.interface';
import { IResponse } from '../../../core/interfaces/response.interface';
import { messages } from '../../../core/utils/messages';
import { ResponseMapper } from '../../mappers/response.mapper';
import { RequestRepository } from '../../repositories/request.repository';

export class GetRequestsUseCase {
  private repository: RequestRepository;
  private responseMapper: ResponseMapper<IRequest[]>;

  constructor(
    repository: RequestRepository,
    responseMapper: ResponseMapper<IRequest[]>,
  ) {
    this.repository = repository;
    this.responseMapper = responseMapper;
  }

  public async execute(): Promise<IResponse<IRequest[]>> {
    const slides = await this.repository.getRequests({ creationDate: -1 });

    if (!slides?.length) {
      return this.responseMapper.toResponse(null, messages.getAllFailure('requests'));
    }

    return this.responseMapper.toResponse(slides, messages.getAll('requests'));
  }
}

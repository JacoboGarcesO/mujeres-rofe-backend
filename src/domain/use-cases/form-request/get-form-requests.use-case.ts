import { IFormRequest } from '../../../core/interfaces/form-requests.interface';
import { IResponse } from '../../../core/interfaces/response.interface';
import { messages } from '../../../core/utils/messages';
import { ResponseMapper } from '../../mappers/response.mapper';
import { FormRequestRepository } from '../../repositories/form-request.repository';

export class GetFormRequestsUseCase {
  private repository: FormRequestRepository;
  private responseMapper: ResponseMapper<IFormRequest[]>;

  constructor(
    repository: FormRequestRepository,
    responseMapper: ResponseMapper<IFormRequest[]>,
  ) {
    this.repository = repository;
    this.responseMapper = responseMapper;
  }

  public async execute(): Promise<IResponse<IFormRequest[]>> {
    const formRequests = await this.repository.getFormRequests();

    if (!formRequests?.length) {
      return this.responseMapper.toResponse(null, messages.getAllFailure('form requests'));
    }

    return this.responseMapper.toResponse(formRequests, messages.getAll('form requests'));
  }
}

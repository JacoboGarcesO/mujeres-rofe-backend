import { IFormRequest } from '../../../core/interfaces/form-requests.interface';
import { IResponse } from '../../../core/interfaces/response.interface';
import { messages } from '../../../core/utils/messages';
import { ResponseMapper } from '../../mappers/response.mapper';
import { FormRequestRepository } from '../../repositories/form-request.repository';

export class GetFormRequestByIdUseCase {
  private repository: FormRequestRepository;
  private responseMapper: ResponseMapper<IFormRequest>;

  constructor(
    repository: FormRequestRepository,
    responseMapper: ResponseMapper<IFormRequest>,
  ) {
    this.repository = repository;
    this.responseMapper = responseMapper;
  }

  public async execute(formRequestId: string): Promise<IResponse<IFormRequest>> {
    const formRequest = await this.repository.getFormRequestById(formRequestId);

    if (!formRequest) {
      return this.responseMapper.toResponse(null, messages.getByIdFailure('form request'));
    }

    return this.responseMapper.toResponse(formRequest, messages.getById('form request'));
  }
}

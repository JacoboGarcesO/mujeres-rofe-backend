import { IFormRequest } from '../../../core/interfaces/form-requests.interface';
import { IResponse } from '../../../core/interfaces/response.interface';
import { messages } from '../../../core/utils/messages';
import { FormRequestMapper } from '../../mappers/form-request.mapper';
import { ResponseMapper } from '../../mappers/response.mapper';
import { FormRequestRepository } from '../../repositories/form-request.repository';

export class UpdateFormRequestUseCase {
  private repository: FormRequestRepository;
  private formRequestMapper: FormRequestMapper;
  private responseMapper: ResponseMapper<IFormRequest>;

  constructor(
    repository: FormRequestRepository,
    formRequestMapper: FormRequestMapper,
    responseMapper: ResponseMapper<IFormRequest>,
  ) {
    this.repository = repository;
    this.formRequestMapper = formRequestMapper;
    this.responseMapper = responseMapper;
  }

  public async execute(data: any): Promise<IResponse<IFormRequest>> {
    const formRequest = this.formRequestMapper.toFormRequest(data);
    const formRequestUpdated = await this.repository.updateChannel(formRequest);
    return this.responseMapper.toResponse(formRequestUpdated, messages.updateSuccess('fom request'));
  }
}

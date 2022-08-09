import { IFormRequest } from '../../../core/interfaces/form-requests.interface';
import { IResponse } from '../../../core/interfaces/response.interface';
import { messages } from '../../../core/utils/messages';
import { FormRequestMapper } from '../../mappers/form-request.mapper';
import { ResponseMapper } from '../../mappers/response.mapper';
import { FormRequestRepository } from '../../repositories/form-request.repository';

export class CreateFormRequestUseCase {
  private repository: FormRequestRepository;
  private responseMapper: ResponseMapper<IFormRequest>;
  private formRequestMapper: FormRequestMapper;

  constructor(
    repository: FormRequestRepository,
    responseMapper: ResponseMapper<IFormRequest>,
    formRequestMapper: FormRequestMapper,
  ) {
    this.repository = repository;
    this.responseMapper = responseMapper;
    this.formRequestMapper = formRequestMapper;
  }

  public async execute(data: any): Promise<IResponse<IFormRequest>> {
    const formRequest = this.formRequestMapper.toFormRequest(data);
    const formRequestCreated = await this.repository.createFormRequest(formRequest);
    return this.responseMapper.toResponse(formRequestCreated, messages.createSuccess('form request'));
  }
}

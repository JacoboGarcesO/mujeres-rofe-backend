import { cdn } from '../../../core/config/cloudinary';
import { IRequest } from '../../../core/interfaces/requests.interface';
import { IResponse } from '../../../core/interfaces/response.interface';
import { messages } from '../../../core/utils/messages';
import { ResponseMapper } from '../../mappers/response.mapper';
import { RequestRepository } from '../../repositories/request.repository';

export class DeleteRequestUseCase {
  private repository: RequestRepository;
  private responseMapper: ResponseMapper<IRequest>;

  constructor(
    repository: RequestRepository,
    responseMapper: ResponseMapper<IRequest>,
  ) {
    this.repository = repository;
    this.responseMapper = responseMapper;
  }

  public async execute(slideId: string): Promise<IResponse<IRequest>> {
    const request = await this.repository.deleteRequest(slideId);

    if (!request) {
      return this.responseMapper.toResponse(null, messages.deleteFailure('request'));
    }

    const fieldImage = request?.fields?.find((field) => field.type === 'image')?.image;

    if (fieldImage) { await cdn.destroy(fieldImage?._id); }

    return this.responseMapper.toResponse(request, messages.deleteSuccess('request'));
  }
}

import { INotice } from '../../../core/interfaces/notice.interface';
import { IResponse } from '../../../core/interfaces/response.interface';
import { messages } from '../../../core/utils/messages';
import { ResponseMapper } from '../../mappers/response.mapper';
import { NoticeRepository } from '../../repositories/notice.repository';

export class GetNoticesUseCase {
  private repository: NoticeRepository;
  private responseMapper: ResponseMapper<INotice[]>;

  constructor(
    repository: NoticeRepository,
    responseMapper: ResponseMapper<INotice[]>,
  ) {
    this.repository = repository;
    this.responseMapper = responseMapper;
  }

  public async execute(): Promise<IResponse<INotice[]>> {
    const notices = await this.repository.getNotices({ order: 1 });

    if (!notices?.length) {
      return this.responseMapper.toResponse(null, messages.getAllFailure('notices'));
    }

    return this.responseMapper.toResponse(notices, messages.getAll('notices'));
  }
}

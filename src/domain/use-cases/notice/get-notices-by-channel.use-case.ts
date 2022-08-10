import { INotice } from '../../../core/interfaces/notice.interface';
import { IResponse } from '../../../core/interfaces/response.interface';
import { messages } from '../../../core/utils/messages';
import { ResponseMapper } from '../../mappers/response.mapper';
import { NoticeRepository } from '../../repositories/notice.repository';

export class GetNoticesByChannelUseCase {
  private repository: NoticeRepository;
  private responseMapper: ResponseMapper<INotice[]>;

  constructor(
    repository: NoticeRepository,
    responseMapper: ResponseMapper<INotice[]>,
  ) {
    this.repository = repository;
    this.responseMapper = responseMapper;
  }

  public async execute(channel: string): Promise<IResponse<INotice[]>> {
    const notices = await this.repository.getNoticeByChannel({ channel }, { order: 'asc' });

    if (!notices) {
      return this.responseMapper.toResponse(null, messages.getAll('notices'));
    }

    return this.responseMapper.toResponse(notices, messages.getAllFailure('notices'));
  }
}

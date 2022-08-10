import { cdn } from '../../../core/config/cloudinary';
import { INotice } from '../../../core/interfaces/notice.interface';
import { IResponse } from '../../../core/interfaces/response.interface';
import { messages } from '../../../core/utils/messages';
import { ResponseMapper } from '../../mappers/response.mapper';
import { NoticeRepository } from '../../repositories/notice.repository';

export class DeleteNoticeUseCase {
  private repository: NoticeRepository;
  private responseMapper: ResponseMapper<INotice>;

  constructor(
    repository: NoticeRepository,
    responseMapper: ResponseMapper<INotice>,
  ) {
    this.repository = repository;
    this.responseMapper = responseMapper;
  }

  public async execute(noticeId: string): Promise<IResponse<INotice>> {
    const notice = await this.repository.deleteNotice(noticeId);

    if (!notice) {
      return this.responseMapper.toResponse(null, messages.deleteFailure('notice'));
    }

    await cdn.destroy(notice?.content?._id);
    await cdn.destroy(notice?.icon?._id);
    return this.responseMapper.toResponse(notice, messages.deleteSuccess('notice'));
  }
}

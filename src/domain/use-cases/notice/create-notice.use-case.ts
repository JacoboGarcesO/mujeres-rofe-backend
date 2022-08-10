import { cdn } from '../../../core/config/cloudinary';
import { INotice } from '../../../core/interfaces/notice.interface';
import { IResponse } from '../../../core/interfaces/response.interface';
import { messages } from '../../../core/utils/messages';
import { NoticeMapper } from '../../mappers/notice.mapper';
import { ResponseMapper } from '../../mappers/response.mapper';
import { NoticeRepository } from '../../repositories/notice.repository';

export class CreateNoticeUseCase {
  private repository: NoticeRepository;
  private noticeMapper: NoticeMapper;
  private responseMapper: ResponseMapper<INotice>;

  constructor(
    repository: NoticeRepository,
    noticeMapper: NoticeMapper,
    responseMapper: ResponseMapper<INotice>,
  ) {
    this.repository = repository;
    this.noticeMapper = noticeMapper;
    this.responseMapper = responseMapper;
  }

  public async execute(data: any, media: any): Promise<IResponse<INotice>> {
    let icon;
    let content;

    if (media.content?.[0] && media.icon?.[0]) {
      content = await cdn.upload(media.content?.[0]?.path);
      icon = await cdn.upload(media.icon?.[0]?.path);
    }   

    const notice = this.noticeMapper.toNotice(data, icon, content);
    const noticeCreated = await this.repository.createNotice(notice);
    return this.responseMapper.toResponse(noticeCreated, messages.createSuccess('notice'));
  }
}

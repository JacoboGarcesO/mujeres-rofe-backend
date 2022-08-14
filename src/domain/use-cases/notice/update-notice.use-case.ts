import { cdn } from '../../../core/config/cloudinary';
import { INotice } from '../../../core/interfaces/notice.interface';
import { IResponse } from '../../../core/interfaces/response.interface';
import { messages } from '../../../core/utils/messages';
import { NoticeMapper } from '../../mappers/notice.mapper';
import { ResponseMapper } from '../../mappers/response.mapper';
import { NoticeRepository } from '../../repositories/notice.repository';

export class UpdateNoticeUseCase {
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
    const iconEncoded = JSON.parse(data.iconEncoded);
    const contentEncoded = JSON.parse(data.contentEncoded);
    let icon;
    let content;

    if (media.content) {
      if (contentEncoded?._id) {
        await cdn.destroy(contentEncoded._id);
      }

      content = await cdn.upload(media.content?.[0]?.path);
    }

    if (media.icon) {
      if (iconEncoded?._id) {
        await cdn.destroy(iconEncoded._id);
      }

      icon = await cdn.upload(media.icon?.[0]?.path);
    }

    const notice = this.noticeMapper.toNotice(data, icon, content);
    const noticeUpdated = await this.repository.updateNotice(notice);
    return this.responseMapper.toResponse(noticeUpdated, messages.updateSuccess('notice'));
  }
}

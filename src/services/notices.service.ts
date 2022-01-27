import noticesCollection from '../collections/notices.collection';
import { NoticeMapper } from '../mappers/notices.mapper';
import { NoticeRequestModel } from '../models/notice.model';
import messages from '../utils/messages';

export class NoticesService {
  private noticeMapper: NoticeMapper;

  constructor(mapper: NoticeMapper) { this.noticeMapper = mapper; }

  async create(noticeDto: any): Promise<NoticeRequestModel> {
    const notice = this.noticeMapper.dtoToNotice(noticeDto);
    const noticeCreated = await new noticesCollection(notice).save();
    const noticeRequest = this.noticeMapper.noticeToDto(noticeCreated, messages.createSuccess('notice'));

    return noticeRequest;
  }
}

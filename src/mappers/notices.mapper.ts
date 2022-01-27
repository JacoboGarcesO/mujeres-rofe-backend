import { NoticeModel, NoticeRequestModel } from '../models/notice.model';

export class NoticeMapper {

  dtoToNotice(notice: any): NoticeModel {
    return {
      image: notice?.image,
      url: notice?.url,
      description: notice?.description,
    };
  }

  noticeToDto(notice: any, message: string): NoticeRequestModel {
    return {
      notice,
      message,
    };
  }
}

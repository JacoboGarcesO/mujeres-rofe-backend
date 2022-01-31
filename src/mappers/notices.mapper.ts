import { NoticeModel, NoticeResponseModel as NoticeResponseModel } from '../models/notice.model';

export class NoticeMapper {

  dtoToNotice(notice: any): NoticeModel {
    return {
      title: notice?.title,
      description: notice?.description,
      order: notice?.order,
      icon: notice?.icon,     
    };
  }

  noticeToDto(notice: NoticeModel, message: string): NoticeResponseModel {
    return {
      notices: [notice],
      message,
    };
  }

  noticesToDto(notices: NoticeModel[], message: string): NoticeResponseModel {
    return {
      notices,
      message,
    };
  }
}

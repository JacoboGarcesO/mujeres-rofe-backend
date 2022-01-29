import { NoticeModel, NoticeRequestModel as NoticeResponseModel } from '../models/notice.model';

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
      notice,
      message,
    };
  }
}

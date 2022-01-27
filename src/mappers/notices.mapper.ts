import { NoticeModel, NoticeRequestModel } from '../models/notice.model';

export class NoticeMapper {

  dtoToNotice(notice: any): NoticeModel {
    return {
      title: notice?.title,
      description: notice?.description,
      order: notice?.order,
      icon: notice?.icon,     
    };
  }

  noticeToDto(notice: any, message: string): NoticeRequestModel {
    return {
      notice,
      message,
    };
  }
}

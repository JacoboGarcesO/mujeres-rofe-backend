import { NoticeModel, NoticeResponseModel as NoticeResponseModel } from '../models/notice.model';

export class NoticeMapper {

  dtoToNotice(notice: any, image: any): NoticeModel {
    console.log(notice);
    return {
      title: notice?.title,
      description: notice?.description,
      order: notice?.order,
      icon: notice?.icon,
      content: image && {
        _id: image?.public_id,
        url: image?.url,
      },
      id: notice?.id,
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

import { UploadApiResponse } from 'cloudinary';
import { NoticeModel, NoticeResponseModel as NoticeResponseModel } from '../models/notice.model';

export class NoticeMapper {

  dtoToNotice(notice: any, media: UploadApiResponse[] | undefined): NoticeModel {
    return {
      title: notice?.title,
      description: notice?.description,
      order: notice?.order,
      icon: media?.[1] && {
        _id: media?.[1]?.public_id,
        url: media?.[1]?.url,
      },
      content: media?.[0] && {
        _id: media?.[0]?.public_id,
        url: media?.[0]?.url,
      },
      links: JSON.parse(notice?.links),
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

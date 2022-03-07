import { UploadApiResponse } from 'cloudinary';
import { MediaModel } from '../models/media.model';
import { NoticeModel, NoticeResponseModel as NoticeResponseModel } from '../models/notice.model';

export class NoticeMapper {
  dtoToNotice(notice: any, icon: UploadApiResponse | undefined, content: UploadApiResponse | undefined): NoticeModel {
    return {
      title: notice?.title,
      description: notice?.description,
      order: notice?.order,
      channel: notice?.channel,
      icon: this.getMedia(icon, JSON.parse(notice?.iconEncoded || '{}')),
      content: this.getMedia(content, JSON.parse(notice?.contentEncoded || '{}')),
      links: JSON.parse(notice?.links),
      showUsersList: notice?.showUsersList,
      isLink: notice?.isLink,
      url: notice?.url,
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

  private getMedia(newMedia: UploadApiResponse | undefined, media: MediaModel): MediaModel {    
    if (!!media && !newMedia) { return media; }

    return {
      _id: newMedia?.public_id,
      url: newMedia?.url,
      type: newMedia?.format,
    };
  }
}

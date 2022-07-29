import { UploadApiResponse } from 'cloudinary';
import { IMedia } from '../models/media.model';
import { INotice, INoticeResponse as INoticeResponse } from '../models/notice.model';

export class NoticeMapper {
  dtoToNotice(notice: any, icon: UploadApiResponse | undefined, content: UploadApiResponse | undefined): INotice {
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
      formId: notice?.formId,
      url: notice?.url,
      id: notice?.id,
    };
  }

  noticeToDto(notice: INotice, message: string): INoticeResponse {
    return {
      notices: [notice],
      message,
    };
  }

  noticesToDto(notices: INotice[], message: string): INoticeResponse {
    return {
      notices,
      message,
    };
  }

  private getMedia(newMedia: UploadApiResponse | undefined, media: IMedia): IMedia {    
    if (!!media && !newMedia) { return media; }

    return {
      _id: newMedia?.public_id,
      url: newMedia?.secure_url,
      type: newMedia?.format,
    };
  }
}

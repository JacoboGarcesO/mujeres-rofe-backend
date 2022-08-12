import { UploadApiResponse } from 'cloudinary';
import { INotice } from '../../core/interfaces/notice.interface';
import { getMedia } from '../../core/utils/get-media.util';

export class NoticeMapper {
  toNotice(notice: any, icon: UploadApiResponse | undefined, content: UploadApiResponse | undefined): INotice {
    return {
      title: notice?.title,
      description: notice?.description,
      order: notice?.order,
      channel: notice?.channel,
      icon: getMedia(icon, JSON.parse(notice?.iconEncoded || '{}')),
      content: getMedia(content, JSON.parse(notice?.contentEncoded || '{}')),
      links: JSON.parse(notice?.links),
      showUsersList: notice?.showUsersList,
      isLink: notice?.isLink,
      formId: notice?.formId,
      url: notice?.url,
      id: notice?.id,
    };
  }
}

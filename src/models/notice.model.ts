import { MediaModel } from './media.model';

export interface linkNoticeModel {
  name: string,
  url: string,
}

export interface NoticeModel {
  title: string;
  description: string;
  order: string;
  channel: string;
  icon: MediaModel;
  content: MediaModel;
  links: linkNoticeModel[],
  showUsersList: boolean,
  isLink: boolean,
  url: string,
  id?: string;
}

export interface NoticeResponseModel {
  notices: NoticeModel[];
  message: string;
}

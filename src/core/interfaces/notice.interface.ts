import { IMedia } from './media.interface';

export interface INotice {
  title: string;
  description: string;
  order: string;
  channel: string;
  icon: IMedia;
  content: IMedia;
  links: ILinkNotice[];
  showUsersList: boolean;
  isLink: boolean;
  url: string;
  formId: string;
  id?: string;
}

export interface INoticeResponse {
  notices: INotice[];
  message: string;
}

interface ILinkNotice {
  name: string,
  url: string,
}

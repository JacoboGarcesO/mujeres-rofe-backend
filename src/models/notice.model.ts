import { MediaModel } from './media.model';

export interface linkNoticeModel {
  name: string,
  url: string,
}

export interface NoticeModel {
  title: string;
  description: string;
  order: number;
  icon?: MediaModel;
  content?: MediaModel;
  links?: linkNoticeModel[],
  id?: string;
}

export interface NoticeResponseModel {
  notices: NoticeModel[];
  message: string;
}

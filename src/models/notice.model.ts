import { MediaModel } from './media.model';

export interface NoticeModel {
  title: string;
  description: string;
  order: number;
  icon?: MediaModel;
  content?: MediaModel;
  id?: string;
}

export interface NoticeResponseModel {
  notices: NoticeModel[];
  message: string;
}

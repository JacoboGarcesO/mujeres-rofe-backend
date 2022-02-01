import { MediaModel } from './media.model';

export interface NoticeModel {
  title: string;
  description: string;
  order: number;
  icon: string;
  content: string;
  id?: string;
}

export interface NoticeResponseModel {
  notices: NoticeModel[];
  message: string;
}

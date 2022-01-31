export interface NoticeModel {
  title: string;
  description: string;
  order: number;
  icon: number;  
}

export interface NoticeResponseModel {
  notices: NoticeModel[];
  message: string;
}

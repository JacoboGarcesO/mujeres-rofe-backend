export interface NoticeModel {
  title: string;
  description: string;
  order: number;
  icon: number;  
}

export interface NoticeRequestModel {
  notice: NoticeModel;
  message: string;
}

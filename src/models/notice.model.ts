export interface NoticeModel {
  image: string;
  url: string;
  description: string;
}

export interface NoticeRequestModel {
  notice: NoticeModel;
  message: string;
}

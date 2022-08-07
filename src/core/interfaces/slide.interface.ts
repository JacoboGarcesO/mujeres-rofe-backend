import { IMedia } from './media.interface';

export interface ISlide {
  title: string;
  image: IMedia;
  url: string;
  id?: string;
}
export interface ISlideResponse {
  slides: ISlide[];
  message: string;
}

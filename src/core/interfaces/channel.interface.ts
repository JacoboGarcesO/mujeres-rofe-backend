import { IMedia } from './media.interface';

export interface IChannel {
  name: string;
  description: string;
  order: number;
  icon: IMedia;
  banner: IMedia;
  type: string,
  link: string,
  id: string;
}

import { IMedia } from './media.model';

export interface IChannel {
  name: string;
  description: string;
  order: number;
  icon?: IMedia;
  banner?: IMedia;
  type: string,
  link: string,
  id?: string;
}

export interface IChannelResponse {
  channels: IChannel[];
  message: string;
}

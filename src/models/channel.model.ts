import { MediaModel } from './media.model';

export interface ChannelModel {
  name: string;
  description: string;
  order: number;
  icon?: MediaModel;
  banner?: MediaModel;
  id?: string;
}

export interface ChannelResponseModel {
  channels: ChannelModel[];
  message: string;
}

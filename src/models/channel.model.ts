export interface ChannelModel {
  name: string;
  description: string;
  icon: string;
  banner: string;
  order: number;
  id?: string;
}

export interface ChannelResponseModel {
  channels: ChannelModel[];
  message: string;
}

export interface ChannelModel {
  name: string;
  description: string;
  icon: string;
  banner: string;
  order: number;  
}

export interface ChannelResponseModel {
  channels: ChannelModel[];
  message: string;
}

export interface ChannelModel {
  name: string;
  description: string;
  icon: string;
  banner: string;
  order: number;  
}

export interface ChannelRequestModel {
  channel: ChannelModel;
  message: string;
}

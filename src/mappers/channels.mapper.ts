import { ChannelModel, ChannelRequestModel } from '../models/channel.model';

export class ChannelMapper {

  dtoToChannel(channel: any): ChannelModel {
    return {
      name: channel?.name,
      description: channel?.description,
      icon: channel?.icon,
      banner: channel?.banner,
      order: channel?.order,
    };
  }

  channelToDto(channel: any, message: string): ChannelRequestModel {
    return {
      channel,
      message,
    };
  }
}

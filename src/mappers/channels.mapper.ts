import { ChannelModel, ChannelRequestModel as ChannelResponseModel } from '../models/channel.model';

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

  channelToDto(channel: ChannelModel, message: string): ChannelResponseModel {
    return {
      channel,
      message,
    };
  }
}

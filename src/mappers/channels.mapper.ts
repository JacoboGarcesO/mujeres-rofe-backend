import { ChannelModel, ChannelResponseModel as ChannelResponseModel } from '../models/channel.model';

export class ChannelMapper {

  dtoToChannel(channel: any, image: any): ChannelModel {
    return {
      name: channel?.name,
      description: channel?.description,
      icon: channel?.icon,
      banner: image && {
        _id: image?.public_id,
        url: image?.url,
      },
      order: channel?.order,
      id: channel?.id,
    };
  }

  channelToDto(channel: ChannelModel, message: string): ChannelResponseModel {
    return {
      channels: [channel],
      message,
    };
  }

  channelsToDto(channels: ChannelModel[], message: string): ChannelResponseModel {
    return {
      channels,
      message,
    };
  }
}

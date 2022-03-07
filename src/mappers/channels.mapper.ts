import { UploadApiResponse } from 'cloudinary';
import { ChannelModel, ChannelResponseModel as ChannelResponseModel } from '../models/channel.model';

export class ChannelMapper {

  dtoToChannel(channel: any, media: UploadApiResponse[] | undefined): ChannelModel {
    return {
      name: channel?.name,
      description: channel?.description,
      icon: media?.[1] && {
        _id: media?.[1].public_id,
        url: media?.[1].url,
        type: media?.[1].type,
      },
      banner: media?.[0] && {
        _id: media?.[0].public_id,
        url: media?.[0].url,
        type: media?.[0].type,
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

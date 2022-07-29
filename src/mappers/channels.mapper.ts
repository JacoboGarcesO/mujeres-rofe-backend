import { UploadApiResponse } from 'cloudinary';
import { IChannel, IChannelResponse as IChannelResponse } from '../models/channel.model';
import { IMedia } from '../models/media.model';

export class ChannelMapper {

  dtoToChannel(channel: any, icon: UploadApiResponse | undefined, banner: UploadApiResponse | undefined): IChannel {
    return {
      name: channel?.name,
      description: channel?.description,
      icon: this.getMedia(icon, JSON.parse(channel?.iconEncoded || '{}')),
      banner: this.getMedia(banner, JSON.parse(channel?.bannerEncoded || '{}')),
      order: channel?.order,
      type: channel?.type,
      link: channel?.link,
      id: channel?.id,
    };
  }

  channelToDto(channel: IChannel, message: string): IChannelResponse {
    return {
      channels: [channel],
      message,
    };
  }

  channelsToDto(channels: IChannel[], message: string): IChannelResponse {
    return {
      channels,
      message,
    };
  }

  private getMedia(newMedia: UploadApiResponse | undefined, media: IMedia): IMedia {    
    if (!!media && !newMedia) { return media; }

    return {
      _id: newMedia?.public_id,
      url: newMedia?.secure_url,
      type: newMedia?.format,
    };
  }
}

import { UploadApiResponse } from 'cloudinary';
import { ChannelModel, ChannelResponseModel as ChannelResponseModel } from '../models/channel.model';
import { MediaModel } from '../models/media.model';

export class ChannelMapper {

  dtoToChannel(channel: any, icon: UploadApiResponse | undefined, banner: UploadApiResponse | undefined): ChannelModel {
    return {
      name: channel?.name,
      description: channel?.description,
      icon: this.getMedia(icon, JSON.parse(channel?.iconEncoded || '{}')),
      banner: this.getMedia(banner, JSON.parse(channel?.iconEncoded || '{}')),
      order: channel?.order,
      type: channel?.type,
      link: channel?.link,
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

  private getMedia(newMedia: UploadApiResponse | undefined, media: MediaModel): MediaModel {    
    if (!!media && !newMedia) { return media; }

    return {
      _id: newMedia?.public_id,
      url: newMedia?.secure_url,
      type: newMedia?.format,
    };
  }
}

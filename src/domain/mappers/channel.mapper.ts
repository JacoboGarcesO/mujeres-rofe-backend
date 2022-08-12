import { UploadApiResponse } from 'cloudinary';
import { IChannel } from '../../core/interfaces/channel.interface';
import { getMedia } from '../../core/utils/get-media.util';

export class ChannelMapper {
  toChannel(channel: any, icon: UploadApiResponse | undefined, banner: UploadApiResponse | undefined): IChannel {
    return {
      name: channel?.name,
      description: channel?.description,
      icon: getMedia(icon, JSON.parse(channel?.iconEncoded || '{}')),
      banner: getMedia(banner, JSON.parse(channel?.bannerEncoded || '{}')),
      order: channel?.order,
      type: channel?.type,
      link: channel?.link,
      id: channel?.id,
    };
  }
}

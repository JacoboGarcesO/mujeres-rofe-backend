import { UploadApiResponse } from 'cloudinary';
import { IChannel } from '../../core/interfaces/channel.interface';
import { IMedia } from '../../core/interfaces/media.interface';

export class ChannelMapper {

  toChannel(channel: any, icon: UploadApiResponse | undefined, banner: UploadApiResponse | undefined): IChannel {
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

  private getMedia(newMedia: UploadApiResponse | undefined, media: IMedia): IMedia {    
    if (!!media && !newMedia) { return media; }

    return {
      _id: newMedia?.public_id as string,
      url: newMedia?.secure_url,
      type: newMedia?.format,
    };
  }
}

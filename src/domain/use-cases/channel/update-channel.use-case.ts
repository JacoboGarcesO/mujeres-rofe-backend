import cloudinary from '../../../core/config/cloudinary';
import { IChannel } from '../../../core/interfaces/channel.interface';
import { IResponse } from '../../../core/interfaces/response.interface';
import { messages } from '../../../core/utils/messages';
import { ChannelMapper } from '../../mappers/channel.mapper';
import { ResponseMapper } from '../../mappers/response.mapper';
import { ChannelRepository } from '../../repositories/channel.repository';

export class UpdateChannelUseCase {
  private repository: ChannelRepository;
  private channelMapper: ChannelMapper;
  private responseMapper: ResponseMapper<IChannel>;

  constructor(
    repository: ChannelRepository,
    channelMapper: ChannelMapper,
    responseMapper: ResponseMapper<IChannel>,
  ) {
    this.repository = repository;
    this.channelMapper = channelMapper;
    this.responseMapper = responseMapper;
  }

  public async execute(data: any, media: any): Promise<IResponse<IChannel>> {
    let icon;
    let banner;

    if (media.banner) {
      if (data.banner?._id) {
        await cloudinary.destroy(data?.banner._id);
      }

      banner = await cloudinary.upload(media.banner?.[0]?.path);
    }

    if (media.icon) {
      if (data.icon?._id) {
        await cloudinary.destroy(data.icon?._id);
      }

      icon = await cloudinary.upload(media.icon?.[0]?.path);
    }

    const channel = this.channelMapper.toChannel(data, icon, banner);
    const channelUpdated = await this.repository.updateChannel(channel);
    return this.responseMapper.toResponse(channelUpdated, messages.updateSuccess('channel'));
  }
}
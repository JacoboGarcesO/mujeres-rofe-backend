import { cdn } from '../../../core/config/cloudinary';
import { IChannel } from '../../../core/interfaces/channel.interface';
import { IResponse } from '../../../core/interfaces/response.interface';
import { messages } from '../../../core/utils/messages';
import { ChannelMapper } from '../../mappers/channel.mapper';
import { ResponseMapper } from '../../mappers/response.mapper';
import { ChannelRepository } from '../../repositories/channel.repository';

export class CreateChannelUseCase {
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

    if (media.banner?.[0] && media.icon?.[0]) {
      banner = await cdn.upload(media.banner?.[0]?.path);
      icon = await cdn.upload(media.icon?.[0]?.path);
    }

    const channel = this.channelMapper.toChannel(data, icon, banner);
    const channelCreated = await this.repository.createChannel(channel);
    return this.responseMapper.toResponse(channelCreated, messages.createSuccess('channel'));
  }
}

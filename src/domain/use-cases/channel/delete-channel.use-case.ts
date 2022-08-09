import { cdn } from '../../../core/config/cloudinary';
import { IChannel } from '../../../core/interfaces/channel.interface';
import { IResponse } from '../../../core/interfaces/response.interface';
import { messages } from '../../../core/utils/messages';
import { ResponseMapper } from '../../mappers/response.mapper';
import { ChannelRepository } from '../../repositories/channel.repository';

export class DeleteChannelUseCase {
  private repository: ChannelRepository;
  private responseMapper: ResponseMapper<IChannel>;

  constructor(
    repository: ChannelRepository,
    responseMapper: ResponseMapper<IChannel>,
  ) {
    this.repository = repository;
    this.responseMapper = responseMapper;
  }

  public async execute(channelId: string): Promise<IResponse<IChannel>> {
    const channel = await this.repository.deleteChannel(channelId);

    if (!channel) {
      return this.responseMapper.toResponse(null, messages.deleteFailure('channel'));
    }

    await cdn.destroy(channel?.banner?._id);
    await cdn.destroy(channel?.icon?._id);
    return this.responseMapper.toResponse(channel, messages.deleteSuccess('channel'));
  }
}

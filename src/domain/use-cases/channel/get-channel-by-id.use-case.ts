import { IChannel } from '../../../core/interfaces/channel.interface';
import { IResponse } from '../../../core/interfaces/response.interface';
import { messages } from '../../../core/utils/messages';
import { ResponseMapper } from '../../mappers/response.mapper';
import { ChannelRepository } from '../../repositories/channel.repository';

export class GetChannelByIdUseCase {
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
    const channel = await this.repository.getChannelById(channelId);

    if (!channel) {
      return this.responseMapper.toResponse(null, messages.getByIdFailure('channel'));
    }

    return this.responseMapper.toResponse(channel, messages.getById('channels'));
  }
}

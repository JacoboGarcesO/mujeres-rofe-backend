import { IChannel } from '../../../core/interfaces/channel.interface';
import { IResponse } from '../../../core/interfaces/response.interface';
import { messages } from '../../../core/utils/messages';
import { ResponseMapper } from '../../mappers/response.mapper';
import { ChannelRepository } from '../../repositories/channel.repository';

export class GetChannelsUseCase {
  private repository: ChannelRepository;
  private responseMapper: ResponseMapper<IChannel[]>;

  constructor(
    repository: ChannelRepository,
    responseMapper: ResponseMapper<IChannel[]>,
  ) {
    this.repository = repository;
    this.responseMapper = responseMapper;
  }

  public async execute(): Promise<IResponse<IChannel[]>> {
    const channels = await this.repository.getChannels({ order: 1 });

    if (!channels?.length) {
      return this.responseMapper.toResponse(null, messages.getAllFailure('channels'));
    }

    return this.responseMapper.toResponse(channels, messages.getAll('channels'));
  }
}

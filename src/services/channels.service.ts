import channelsCollection from '../collections/channels.collection';
import { ChannelMapper } from '../mappers/channels.mapper';
import { ChannelRequestModel } from '../models/channel.model';
import messages from '../utils/messages';

export class ChannelsService {
  private channelMapper: ChannelMapper;

  constructor(mapper: ChannelMapper) { this.channelMapper = mapper; }

  async create(channelDto: any): Promise<ChannelRequestModel> {
    const channel = this.channelMapper.dtoToChannel(channelDto);
    const channelCreated = await new channelsCollection(channel).save();
    const channelRequest = this.channelMapper.channelToDto(channelCreated, messages.createSuccess('channel'));

    return channelRequest;
  }
}

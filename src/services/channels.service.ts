import channelsCollection from '../collections/channels.collection';
import { ChannelMapper } from '../mappers/channels.mapper';
import { MessagesMapper } from '../mappers/messages.mapper';
import { ChannelModel, ChannelResponseModel } from '../models/channel.model';
import { MessageModel } from '../models/message.model';
import messages from '../utils/messages';

export class ChannelsService {
  private channelMapper: ChannelMapper;
  private messageMapper: MessagesMapper;

  constructor(mapper: ChannelMapper, messageMapper: MessagesMapper) { 
    this.channelMapper = mapper; 
    this.messageMapper = messageMapper;
  }

  async getAll(): Promise<ChannelResponseModel | MessageModel> {
    const channels: ChannelModel[] = await channelsCollection.find();

    if (!channels?.length) {
      return this.messageMapper.map(messages.getAllFailure('channels'));
    }

    return this.channelMapper.channelsToDto(channels, messages.getAll('channels'));
  }

  async create(channelDto: any): Promise<ChannelResponseModel> {
    const channel = this.channelMapper.dtoToChannel(channelDto);
    const channelCreated = await new channelsCollection(channel).save();
    const channelRequest = this.channelMapper.channelToDto(channelCreated, messages.createSuccess('channel'));

    return channelRequest;
  } 
}

import channelsCollection from '../collections/channels.collection';
import cloudinary from '../config/cloudinary';
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

  async getById(channelId: any): Promise<ChannelResponseModel | MessageModel> {
    const channel: ChannelModel = await channelsCollection.findById(channelId);

    if (!channel) {
      return this.messageMapper.map(messages.getByIdFailure('channel'));
    }

    return this.channelMapper.channelToDto(channel, messages.getById('channel'));
  }

  async create(channelDto: any, channelImage: any): Promise<ChannelResponseModel> {
    let image;

    if (channelImage) {
      image = await cloudinary.upload(channelImage);
    }

    const channel = this.channelMapper.dtoToChannel(channelDto, image);
    const channelCreated = await new channelsCollection(channel).save();
    const channelRequest = this.channelMapper.channelToDto(channelCreated, messages.createSuccess('channel'));

    return channelRequest;
  }

  async update(channelDto: any, channelImage: any): Promise<ChannelResponseModel | MessageModel> {
    let image;

    if (channelImage) {
      if (channelDto?.image) {
        await cloudinary.upload(channelDto?.image._id);
      }

      image = await cloudinary.upload(channelImage);
    }

    const channel = this.channelMapper.dtoToChannel(channelDto, image);
    const channelUpdated = await channelsCollection.findByIdAndUpdate(channel?.id, { $set: channel }, { new: true });
    const channelResponse = this.channelMapper.channelToDto(channelUpdated, messages.updateSuccess('channel'));
    return channelResponse;
  }
}

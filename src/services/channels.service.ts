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
    const channels: ChannelModel[] = await channelsCollection.find().sort({ order: 1 });

    if (!channels?.length) {
      return this.messageMapper.map(messages.getAllFailure('channels'));
    }

    return this.channelMapper.channelsToDto(channels, messages.getAll('channels'));
  }

  async getById(channelId: any): Promise<ChannelResponseModel | MessageModel> {
    const channel = await channelsCollection.findById(channelId);

    if (!channel) {
      return this.messageMapper.map(messages.getByIdFailure('channel'));
    }

    return this.channelMapper.channelToDto(channel, messages.getById('channel'));
  }

  async create(channelDto: any, channelMedia: any): Promise<ChannelResponseModel> {
    let icon;
    let banner;

    if (channelMedia.banner?.[0] && channelMedia.icon?.[0]) {
      banner = await cloudinary.upload(channelMedia.banner?.[0]?.path);
      icon = await cloudinary.upload(channelMedia.icon?.[0]?.path);
    }

    const channel = this.channelMapper.dtoToChannel(channelDto, icon, banner);
    const channelCreated = await new channelsCollection(channel).save();
    const channelRequest = this.channelMapper.channelToDto(channelCreated, messages.createSuccess('channel'));

    return channelRequest;
  }

  async update(channelDto: any, channelMedia: any): Promise<ChannelResponseModel | MessageModel> {
    let icon;
    let banner;

    if (channelMedia.banner) {
      if (channelDto.banner?._id) {
        await cloudinary.destroy(channelDto?.banner._id);
      }

      banner = await cloudinary.upload(channelMedia.banner?.[0]?.path);
    }

    if (channelMedia.icon) {
      if (channelDto.icon?._id) {
        await cloudinary.destroy(channelDto.icon?._id);
      }

      icon = await cloudinary.upload(channelMedia.icon?.[0]?.path);
    }

    const channel = this.channelMapper.dtoToChannel(channelDto, icon, banner);
    const channelUpdated = await channelsCollection.findByIdAndUpdate(channel?.id, { $set: channel }, { new: true });
    const channelResponse = this.channelMapper.channelToDto(channelUpdated, messages.updateSuccess('channel'));
    return channelResponse;
  }

  async delete(channelId: any): Promise<MessageModel> {
    const channel = await channelsCollection.findByIdAndDelete(channelId);

    if (!channel) {
      return this.messageMapper.map(messages.deleteFailure('channel'));
    }

    await cloudinary.destroy(channel?.banner?._id);
    await cloudinary.destroy(channel?.icon?._id);

    return this.channelMapper.channelToDto(channel, messages.deleteSuccess('channel'));
  }
}

import { IChannel } from '../../core/interfaces/channel.interface';
import { MongooseSource } from '../../data/mongoose.source';

export class ChannelRepository {
  private db: MongooseSource<IChannel>;

  constructor(db: MongooseSource<IChannel>) { this.db = db; }

  public async getChannels(sorter: any): Promise<IChannel[]> {
    return await this.db.findAll({}, sorter);
  }

  public async getChannelById(channelId: string): Promise<IChannel | null> {
    return await this.db.findById(channelId);
  }

  public async createChannel(channel: IChannel): Promise<IChannel> {
    return await this.db.create(channel);
  }

  public async updateChannel(channel: IChannel): Promise<IChannel | null> {
    return await this.db.update(channel.id, channel);
  }

  public async deleteChannel(channelId: string): Promise<IChannel | null> {
    return await this.db.delete(channelId);
  }
}

import { ModifyResult } from 'mongoose';
import { INotice } from '../../core/interfaces/notice.interface';
import { MongooseSource } from '../../data/mongoose.source';

export class NoticeRepository {
  private db: MongooseSource<INotice>;

  constructor(db: MongooseSource<INotice>) { this.db = db; }

  public async getNotices(sorter: any): Promise<INotice[]> {
    return await this.db.findAll({}, sorter);
  }

  public async getNoticeById(channelId: string): Promise<INotice | null> {
    return await this.db.findById(channelId);
  }

  public async getNoticeByChannel(filter: any, sorter: any): Promise<INotice[] | null> {
    return await this.db.findAll(filter, sorter);
  }

  public async createNotice(channel: INotice): Promise<INotice> {
    return await this.db.create(channel);
  }

  public async updateNotice(channel: INotice): Promise<ModifyResult<INotice> | null> {
    return await this.db.update(channel.id, channel);
  }

  public async deleteNotice(channelId: string): Promise<INotice | null> {
    return await this.db.delete(channelId);
  }
}

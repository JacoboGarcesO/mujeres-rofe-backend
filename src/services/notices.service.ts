import noticesCollection from '../data/models/notice.model';
import cloudinary from '../core/config/cloudinary';
import { MessagesMapper } from '../domain/mappers/messages.mapper';
import { NoticeMapper } from '../domain/mappers/notice.mapper';
import { IMessage } from '../core/interfaces/message.interface';
import { INotice, INoticeResponse } from '../core/interfaces/notice.interface';
import { messages } from '../core/utils/messages';

export class NoticesService {
  private noticeMapper: NoticeMapper;
  private messageMapper: MessagesMapper;

  constructor(mapper: NoticeMapper, messageMapper: MessagesMapper) {
    this.noticeMapper = mapper;
    this.messageMapper = messageMapper;
  }

  async getAll(): Promise<INoticeResponse | IMessage> {
    const notices: INotice[] = await noticesCollection.find();

    if (!notices?.length) {
      return this.messageMapper.map(messages.getAllFailure('notices'));
    }

    return this.noticeMapper.noticesToDto(notices, messages.getAll('notices'));
  }

  async getById(noticeId: any): Promise<INoticeResponse | IMessage> {
    const notice = await noticesCollection.findById(noticeId);

    if (!notice) {
      return this.messageMapper.map(messages.getByIdFailure('notices'));
    }

    return this.noticeMapper.noticeToDto(notice, messages.getById('notice'));
  }

  async getNoticesByChannel(channel: any): Promise<INoticeResponse | IMessage> {
    const notices: INotice[] = await noticesCollection.find({channel}).sort({ order : 'asc'});
  
    if (!notices?.length) {
      return this.messageMapper.map(messages.getAllFailure('notices'));
    }

    return this.noticeMapper.noticesToDto(notices, messages.getAll('notices'));
  }

  async create(noticeDto: any, noticeMedia: any): Promise<INoticeResponse> {
    let icon;
    let content;

    if (noticeMedia.content?.[0] && noticeMedia.icon?.[0]) {
      content = await cloudinary.upload(noticeMedia.content?.[0]?.path);
      icon = await cloudinary.upload(noticeMedia.icon?.[0]?.path);
    }    

    const notice = this.noticeMapper.dtoToNotice(noticeDto, icon, content);
    const noticeCreated = await new noticesCollection(notice).save();
    const noticeRequest = this.noticeMapper.noticeToDto(noticeCreated, messages.createSuccess('notice'));

    return noticeRequest;
  }

  async update(noticeDto: any, noticeMedia: any): Promise<INoticeResponse | IMessage> {
    let icon;
    let content;    

    if (noticeMedia?.content) {
      if (noticeDto.content?._id) {
        await cloudinary.destroy(noticeDto?.content?._id);
      }

      content = await cloudinary.upload(noticeMedia?.content?.[0]?.path);
    }

    if (noticeMedia?.icon) {
      if (noticeDto.icon?._id) {
        await cloudinary.destroy(noticeDto.icon._id);
      }

      icon = await cloudinary.upload(noticeMedia?.icon?.[0]?.path);
    }

    const notice = this.noticeMapper.dtoToNotice(noticeDto, icon, content);
    const noticeUpdated = await noticesCollection.findByIdAndUpdate(notice?.id, { $set: notice }, { new: true });
    const noticeResponse = this.noticeMapper.noticeToDto(noticeUpdated, messages.updateSuccess('notice'));
    return noticeResponse;
  }

  async delete(noticeId: any): Promise<IMessage> {
    const notice = await noticesCollection.findByIdAndDelete(noticeId);

    if (!notice) {
      return this.messageMapper.map(messages.deleteFailure('notice'));
    }

    await cloudinary.destroy(notice?.content?._id);
    await cloudinary.destroy(notice?.icon?._id);

    return this.noticeMapper.noticeToDto(notice, messages.deleteSuccess('notice'));
  }
}

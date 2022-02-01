import noticesCollection from '../collections/notices.collection';
import cloudinary from '../config/cloudinary';
import { MessagesMapper } from '../mappers/messages.mapper';
import { NoticeMapper } from '../mappers/notices.mapper';
import { MessageModel } from '../models/message.model';
import { NoticeModel, NoticeResponseModel } from '../models/notice.model';
import messages from '../utils/messages';

export class NoticesService {
  private noticeMapper: NoticeMapper;
  private messageMapper: MessagesMapper;

  constructor(mapper: NoticeMapper, messageMapper: MessagesMapper) {
    this.noticeMapper = mapper;
    this.messageMapper = messageMapper;
  }

  async getAll(): Promise<NoticeResponseModel | MessageModel> {
    const notices: NoticeModel[] = await noticesCollection.find();

    if (!notices?.length) {
      return this.messageMapper.map(messages.getAllFailure('notices'));
    }

    return this.noticeMapper.noticesToDto(notices, messages.getAll('notices'));
  }

  async getById(noticeId: any): Promise<NoticeResponseModel | MessageModel> {
    const notice: NoticeModel = await noticesCollection.findById(noticeId);

    if (!notice) {
      return this.messageMapper.map(messages.getByIdFailure('notices'));
    }

    return this.noticeMapper.noticeToDto(notice, messages.getById('notice'));
  }

  async create(noticeDto: any, noticeImage: any): Promise<NoticeResponseModel> {
    let image;

    if (noticeImage) {
      image = await cloudinary.upload(noticeImage);
    }

    const notice = this.noticeMapper.dtoToNotice(noticeDto, image);
    const noticeCreated = await new noticesCollection(notice).save();
    const noticeRequest = this.noticeMapper.noticeToDto(noticeCreated, messages.createSuccess('notice'));

    return noticeRequest;
  }

  async update(noticeDto: any, noticeImage: any): Promise<NoticeResponseModel | MessageModel> {
    let image;

    if (noticeImage) {
      if (noticeDto?.image) {
        await cloudinary.upload(noticeDto?.image._id);
      }

      image = await cloudinary.upload(noticeImage);
    }

    const notice = this.noticeMapper.dtoToNotice(noticeDto, image);
    const noticeUpdated = await noticesCollection.findByIdAndUpdate(notice?.id, { $set: notice }, { new: true });
    const noticeResponse = this.noticeMapper.noticeToDto(noticeUpdated, messages.updateSuccess('notice'));
    return noticeResponse;
  }
}

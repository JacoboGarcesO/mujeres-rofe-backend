import requestsCollection from '../collections/requests.collection';
import { MessagesMapper } from '../mappers/messages.mapper';
import { RequestsModel, RequestsResponseModel } from '../models/requests.model';
import { MessageModel } from '../models/message.model';
import messages from '../utils/messages';
import { EmailsService } from './emails.service';
import { RequestMapper } from '../mappers/requests.mapper';
import cloudinary from '../config/cloudinary';

const emailsService = new EmailsService();

export class RequestsService {
  private messageMapper: MessagesMapper;
  private requestMapper: RequestMapper;

  constructor(messageMapper: MessagesMapper, requestMapper: RequestMapper) {
    this.messageMapper = messageMapper;
    this.requestMapper = requestMapper;
  }

  async getAll(): Promise<RequestsResponseModel | MessageModel> {
    const requests: RequestsModel[] = await requestsCollection.find().sort({ creationDate: -1 });

    if (!requests?.length) {
      return this.messageMapper.map(messages.getAllFailure('requests'));
    }

    const message = messages.getAll('requests');

    return { requests, message };
  }

  async getById(requestId: any): Promise<RequestsResponseModel | MessageModel> {
    const request = await requestsCollection.findById(requestId).populate('formId');

    if (!request) {
      return this.messageMapper.map(messages.getByIdFailure('requests'));
    }

    const message = messages.getById('requests');
    const requestResponse = { requests: [request], message };

    return requestResponse;
  }

  async create(request: any, media: any): Promise<RequestsResponseModel> {
    let image;
  
    if (media?.image?.[0]) {
      image = await cloudinary.upload(media?.image?.[0]?.path);
    }

    const requestMapped = this.requestMapper.toRequest(request, image);

    const requestCreated = await new requestsCollection(requestMapped).save();

    const user = {
      email: request?.userEmail,
      firstName: request?.userFirstName,
      lastName: request?.userLastName,
      document: request?.userDocument,
    };

    await emailsService.send(user, requestMapped?.subject, requestMapped?.template, requestMapped?.title);
    const message = messages.createSuccess('request');
    const requestResponse = { requests: [requestCreated], message };

    return requestResponse;
  }

  async update(request: any): Promise<RequestsResponseModel | MessageModel> {
    const requestUpdated = await requestsCollection.findByIdAndUpdate(request?.id, { $set: request }, { new: true });
    const message = messages.updateSuccess('request');
    const requestResponse = { requests: [requestUpdated], message };

    return requestResponse;
  }

  async delete(requestId: any): Promise<MessageModel> {
    const request = await requestsCollection.findByIdAndDelete(requestId);

    if (!request) {
      return this.messageMapper.map(messages.deleteFailure('request'));
    }

    const fieldImage = request?.fields?.find((field: any) => field?.type === 'image')?.image;

    if (fieldImage) {
      await cloudinary.destroy(fieldImage?._id);
    }

    const message = messages.deleteSuccess('request');
    const requestResponse = { requests: [request], message };

    return requestResponse;
  }
}

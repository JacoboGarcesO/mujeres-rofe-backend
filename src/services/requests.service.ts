import requestsCollection from '../collections/requests.collection';
import { MessagesMapper } from '../mappers/messages.mapper';
import { RequestsModel, RequestsResponseModel } from '../models/requests.model';
import { MessageModel } from '../models/message.model';
import messages from '../utils/messages';

export class RequestsService {
  private messageMapper: MessagesMapper;
    
  constructor(messageMapper: MessagesMapper) {
    this.messageMapper = messageMapper;
  }

  async getAll(): Promise<RequestsResponseModel | MessageModel> {
    const requests: RequestsModel[] = await requestsCollection.find();

    if (!requests?.length) {
      return this.messageMapper.map(messages.getAllFailure('requests'));
    }

    const message = messages.getAll('requests');

    return { requests, message };
  }

  async getById(requestId: any): Promise<RequestsResponseModel | MessageModel> {
    const request = await requestsCollection.findById(requestId);

    if (!request) {
      return this.messageMapper.map(messages.getByIdFailure('requests'));
    }

    const message = messages.getById('requests');
    const requestResponse = {  requests: [request], message };

    return requestResponse;
  }

  async create(request: any): Promise<RequestsResponseModel> {
    const requestCreated = await new requestsCollection(request).save();
    const message = messages.createSuccess('request');
    const requestResponse = {  requests: [requestCreated], message };

    return requestResponse;
  }

  async update(request: any): Promise<RequestsResponseModel | MessageModel> {
    const requestUpdated = await requestsCollection.findByIdAndUpdate(request?.id, { $set: request }, { new: true });
    const message = messages.updateSuccess('request');
    const requestResponse = {  requests: [requestUpdated], message };

    return requestResponse;
  }

  async delete(requestId: any): Promise<MessageModel> {
    const request = await requestsCollection.findByIdAndDelete(requestId);

    if (!request) {
      return this.messageMapper.map(messages.deleteFailure('request'));
    }

    const message = messages.deleteSuccess('request');
    const requestResponse = {  requests: [request], message };

    return requestResponse;
  }
}

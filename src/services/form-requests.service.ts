import formRequestsCollection from '../data/models/form-request.model';
import { MessagesMapper } from '../domain/mappers/messages.mapper';
import { IFormRequest, IFormRequestResponse } from '../core/interfaces/form-requests.interface';
import { IMessage } from '../core/interfaces/message.interface';
import { messages } from '../core/utils/messages';

export class formRequestsService {
  private messageMapper: MessagesMapper;

  constructor(messageMapper: MessagesMapper) {
    this.messageMapper = messageMapper;
  }

  async getAll(): Promise<IFormRequestResponse | IMessage> {
    const forms: IFormRequest[] = await formRequestsCollection.find();

    if (!forms?.length) {
      return this.messageMapper.map(messages.getAllFailure('forms requests'));
    }

    const message = messages.getAll('forms requests');

    return { forms, message };
  }

  async getById(formId: any): Promise<IFormRequestResponse | IMessage> {
    const form = await formRequestsCollection.findById(formId);

    if (!form) {
      return this.messageMapper.map(messages.getByIdFailure('forms'));
    }

    const message = messages.getById('form');
    const formResponse = { forms: [form], message };

    return formResponse;
  }

  async create(form: any): Promise<IFormRequestResponse> {
    const formCreated = await new formRequestsCollection(form).save();
    const message = messages.createSuccess('form');
    const formResponse = { forms: [formCreated], message };

    return formResponse;
  }

  async update(form: any): Promise<IFormRequestResponse | IMessage> {
    const formUpdated = await formRequestsCollection.findByIdAndUpdate(form?.id, { $set: form }, { new: true });
    const message = messages.updateSuccess('form');
    const formResponse = { forms: [formUpdated], message };

    return formResponse;
  }

  async delete(formId: any): Promise<IMessage> {
    const form = await formRequestsCollection.findByIdAndDelete(formId);

    if (!form) {
      return this.messageMapper.map(messages.deleteFailure('form'));
    }

    const message = messages.deleteSuccess('form');
    const formResponse = { forms: [form], message };

    return formResponse;
  }
}

import formRequestsCollection from '../collections/form-requests.collection';
import { MessagesMapper } from '../mappers/messages.mapper';
import { FormRequestsModel, FormRequestsResponseModel } from '../models/form-requests.model';
import { MessageModel } from '../models/message.model';
import messages from '../utils/messages';

export class formRequestsService {
  private messageMapper: MessagesMapper;
    
  constructor(messageMapper: MessagesMapper) {
    this.messageMapper = messageMapper;
  }

  async getAll(): Promise<FormRequestsResponseModel | MessageModel> {
    const forms: FormRequestsModel[] = await formRequestsCollection.find();

    if (!forms?.length) {
      return this.messageMapper.map(messages.getAllFailure('forms requests'));
    }

    const message = messages.getAll('forms requests');

    return { forms, message };
  }

  async create(form: any): Promise<FormRequestsResponseModel> {
    const formCreated = await new formRequestsCollection(form).save();
    const message = messages.createSuccess('form');
    const formResponse = {  forms: [formCreated], message };

    return formResponse;
  }

  async update(form: any): Promise<FormRequestsResponseModel | MessageModel> {
    const formUpdated = await formRequestsCollection.findByIdAndUpdate(form?.id, { $set: form }, { new: true });
    const message = messages.updateSuccess('form');
    const formResponse = {  forms: [formUpdated], message };

    return formResponse;
  }

  async delete(formId: any): Promise<MessageModel> {
    const form = await formRequestsCollection.findByIdAndDelete(formId);

    if (!form) {
      return this.messageMapper.map(messages.deleteFailure('form'));
    }

    const message = messages.deleteSuccess('form');
    const formResponse = {  forms: [form], message };

    return formResponse;
  }
}
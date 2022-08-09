import requestsCollection from '../data/models/request.model';
import { MessagesMapper } from '../domain/mappers/messages.mapper';
import { IRequest, IRequestResponse } from '../core/interfaces/requests.interface';
import { IMessage } from '../core/interfaces/message.interface';
import { messages } from '../core/utils/messages';
import { EmailsService } from '../domain/use-cases/email/send-email.use-case';
import { RequestMapper } from '../domain/mappers/request.mapper';
import cloudinary from '../core/config/cloudinary';
import { EmailMapper } from '../domain/mappers/email.mapper';

export class RequestsService {
  private messageMapper: MessagesMapper = new MessagesMapper();
  private requestMapper: RequestMapper = new RequestMapper();
  private emailService: EmailsService = new EmailsService();
  private emailMapper: EmailMapper = new EmailMapper();

  async getAll(): Promise<IRequestResponse | IMessage> {
    const requests: IRequest[] = await requestsCollection.find().sort({ creationDate: -1 });

    if (!requests?.length) {
      return this.messageMapper.map(messages.getAllFailure('requests'));
    }

    const message = messages.getAll('requests');

    return { requests, message };
  }

  async getById(requestId: any): Promise<IRequestResponse | IMessage> {
    const request = await requestsCollection.findById(requestId).populate('formId');

    if (!request) {
      return this.messageMapper.map(messages.getByIdFailure('requests'));
    }

    const message = messages.getById('requests');
    const requestResponse = { requests: [request], message };

    return requestResponse;
  }

  async create(request: any, media: any): Promise<IRequestResponse> {
    let image;

    if (media?.image?.[0]) {
      image = await cloudinary.upload(media?.image?.[0]?.path);
    }

    const requestMapped = this.requestMapper.toRequest(request, image);

    const requestCreated = await new requestsCollection(requestMapped).save();

    const emailData = this.emailMapper.toEmail(
      requestMapped.template,
      request?.userFirstName,
      request?.userLastName,
      request?.userEmail,
      requestMapped?.subject,
      requestMapped?.title,
      request?.userDocument,
    );

    await this.emailService.send(emailData);
    const message = messages.createSuccess('request');
    const requestResponse = { requests: [requestCreated], message };

    return requestResponse;
  }

  async update(request: any): Promise<IRequestResponse | IMessage> {
    const requestUpdated = await requestsCollection.findByIdAndUpdate(request?.id, { $set: request }, { new: true });
    const message = messages.updateSuccess('request');
    const requestResponse = { requests: [requestUpdated], message };

    return requestResponse;
  }

  async delete(requestId: any): Promise<IMessage> {
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

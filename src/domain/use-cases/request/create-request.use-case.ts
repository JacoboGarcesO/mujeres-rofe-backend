import { cdn } from '../../../core/config/cloudinary';
import { IRequest } from '../../../core/interfaces/requests.interface';
import { IResponse } from '../../../core/interfaces/response.interface';
import { messages } from '../../../core/utils/messages';
import { EmailMapper } from '../../mappers/email.mapper';
import { RequestMapper } from '../../mappers/request.mapper';
import { ResponseMapper } from '../../mappers/response.mapper';
import { RequestRepository } from '../../repositories/request.repository';
import { EmailsUseCase } from '../email/send-email.use-case';

export class CreateRequestUseCase {
  private repository: RequestRepository;
  private requestMapper: RequestMapper;
  private emailMapper: EmailMapper;
  private emailUseCase: EmailsUseCase;
  private responseMapper: ResponseMapper<IRequest>;

  constructor(
    repository: RequestRepository,
    requestMapper: RequestMapper,
    emailMapper: EmailMapper,
    emailUseCase: EmailsUseCase,
    responseMapper: ResponseMapper<IRequest>,
  ) {
    this.repository = repository;
    this.emailMapper = emailMapper;
    this.emailUseCase = emailUseCase;
    this.requestMapper = requestMapper;
    this.responseMapper = responseMapper;
  }

  public async execute(data: any, media: any): Promise<IResponse<IRequest>> {
    let image;

    if (media) { image = await cdn.upload(media); }   
  
    const request = this.requestMapper.toRequest(data, image);
    const requestCreated = await this.repository.createRequest(request);

    const emailData = this.emailMapper.toEmail(
      requestCreated.template,
      data?.userFirstName,
      data?.userLastName,
      data?.userEmail,
      requestCreated?.subject,
      requestCreated?.title,
      data?.userDocument,
    );

    await this.emailUseCase.send(emailData);
  
    return this.responseMapper.toResponse(requestCreated, messages.createSuccess('request'));
  }
}

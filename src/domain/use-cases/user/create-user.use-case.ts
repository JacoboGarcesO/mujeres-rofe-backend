import { cdn } from '../../../core/config/cloudinary';
import { TemplateEnum } from '../../../core/constants/template.enum';
import { IResponse } from '../../../core/interfaces/response.interface';
import { IUser } from '../../../core/interfaces/user.interface';
import { messages } from '../../../core/utils/messages';
import { EmailMapper } from '../../mappers/email.mapper';
import { ResponseMapper } from '../../mappers/response.mapper';
import { UserMapper } from '../../mappers/user.mapper';
import { UserRepository } from '../../repositories/user.repository';
import { EmailsUseCase } from '../email/send-email.use-case';

export class CreateUserUseCase {
  private repository: UserRepository;
  private userMapper: UserMapper;
  private emailMapper: EmailMapper;
  private emailUseCase: EmailsUseCase;
  private responseMapper: ResponseMapper<IUser>;

  constructor(
    repository: UserRepository,
    userMapper: UserMapper,
    emailMapper: EmailMapper,
    emailUseCase: EmailsUseCase,
    responseMapper: ResponseMapper<IUser>,
  ) {
    this.repository = repository;
    this.userMapper = userMapper;
    this.emailMapper = emailMapper;
    this.emailUseCase = emailUseCase;
    this.responseMapper = responseMapper;
  }

  public async execute(data: any, media: any): Promise<IResponse<IUser>> {
    const isEmailDuplicated = await this.throwDuplicated(data?.email?.toLowerCase(), 'Email');
    const isDocumentDuplicated = await this.throwDuplicated(data?.document, 'Document');

    if (isEmailDuplicated) { return this.responseMapper.toResponse(null, isEmailDuplicated?.message); }

    if (isDocumentDuplicated) { return this.responseMapper.toResponse(null, isDocumentDuplicated?.message); }

    let image;
    let documentImage;

    if (media.image?.[0] && media.documentImage?.[0]) {
      image = await cdn.upload(media.image?.[0]?.path);
      documentImage = await cdn.upload(media.documentImage?.[0]?.path);
    }

    const user = this.userMapper.toUser(data, image, documentImage);
    const userCreated = await this.repository.createUser(user);
    await this.sendCreationUserEmail(userCreated);
    return this.responseMapper.toResponse(userCreated, messages.createSuccess('user'));
  }

  private async throwDuplicated(data: string, entity: 'Document' | 'Email'): Promise<void | Error> {
    const isDuplicated = await this.repository[`is${entity}Duplicated`](data);
    if (isDuplicated) { return new Error(messages[`${entity}Duplicated`]); }
  }

  private async sendCreationUserEmail(user: IUser): Promise<void> {
    const emailData = this.emailMapper.toEmail(
      TemplateEnum.register,
      user.firstName,
      user.lastName,
      user.email,
      'Confirma tu cuenta de Mujeres ROFÉ',
      '¡Tu cuenta ha sido creada exitosamente!',
      user.documentNumber,
    );

    await this.emailUseCase.send(emailData);
  }

}

import { TemplateEnum } from '../../../core/constants/template.enum';
import { IResponse } from '../../../core/interfaces/response.interface';
import { IUser } from '../../../core/interfaces/user.interface';
import { messages } from '../../../core/utils/messages';
import { EmailMapper } from '../../mappers/email.mapper';
import { ResponseMapper } from '../../mappers/response.mapper';
import { UserRepository } from '../../repositories/user.repository';
import { EmailsUseCase } from '../email/send-email.use-case';

export class ForgotPasswordUseCase {
  private repository: UserRepository;
  private emailMapper: EmailMapper;
  private emailUseCase: EmailsUseCase;
  private responseMapper: ResponseMapper<IUser>;

  constructor(
    repository: UserRepository,
    emailMapper: EmailMapper,
    emailUseCase: EmailsUseCase,
    responseMapper: ResponseMapper<IUser>,
  ) {
    this.repository = repository;
    this.emailMapper = emailMapper;
    this.emailUseCase = emailUseCase;
    this.responseMapper = responseMapper;
  }

  public async execute(data: any): Promise<IResponse<IUser>> {
    const user = await this.repository.getUserByEmail(data?.email?.toLowerCase());

    if (!user) {
      return this.responseMapper.toResponse(null, messages.userNotFound);
    }

    const emailData = this.emailMapper.toEmail(
      TemplateEnum.forgotPassword,
      user.firstName,
      user.lastName,
      user.email,
      'Recordatorio de credenciales para tu cuenta de Mujeres ROFÉ',
      '¡Estas son tus credenciales de acceso!',
      user.documentNumber,
    );

    await this.emailUseCase.send(emailData);

    return this.responseMapper.toResponse(null, messages.forgotPassword);
  }

}

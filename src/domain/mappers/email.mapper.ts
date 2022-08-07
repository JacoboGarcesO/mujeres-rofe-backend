import { IEmail } from '../../core/interfaces/email.interface';
import { TemplateEnum } from '../../core/constants/template.enum';

export class EmailMapper {
  public toEmail(
    templateId: TemplateEnum,
    userFirstName: string,
    userLastName: string,
    userEmail: string,
    subject: string,
    title: string,
    documentNumber?: string,
  ): IEmail {
    return {
      email: userEmail,
      firstName: userFirstName,
      lastName: userLastName,
      subject,
      templateId,
      title,
      documentNumber,
    };
  }
}

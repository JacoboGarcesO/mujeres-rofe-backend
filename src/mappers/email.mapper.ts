import { IEmail } from '../models/email.model';
import { TemplateEnum } from '../models/template.enum';

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

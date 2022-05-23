
import { createEmail } from '../utils/emails';
import smg from '../config/sendgrid';
import { MailDataRequired } from '@sendgrid/mail';

export class EmailsService {
  async send(user: any, subject: string,  templateId: string, title: string): Promise<any> {
    const msg = createEmail(templateId, subject, user.email, user?.firstName, user?.lastName, user?.document, title, user?.documentNumber);
    return await smg.send(msg as MailDataRequired | MailDataRequired[]);
  }
}

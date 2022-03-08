
import { createEmail } from '../utils/emails';
import { UserModel } from '../models/user.model';
import smg from '../config/sendgrid';
import { MailDataRequired } from '@sendgrid/mail';

export class EmailsService {
  async send(user: UserModel, templateId: string): Promise<any> {
    const msg = createEmail(templateId, user.email, user.firstName, user.lastName, user.document);
    return await smg.send(msg as MailDataRequired | MailDataRequired[]);
  }
}

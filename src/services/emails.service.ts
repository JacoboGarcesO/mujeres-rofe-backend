
import createEmail from '../utils/emails/emails';
import sender from '../config/sendgrid';
import { IEmail } from '../models/email.model';

export class EmailsService {
  async send(data: IEmail): Promise<any> {
    return await sender.send(createEmail(data));
  }
}

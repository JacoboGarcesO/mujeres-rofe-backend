
import { sender } from '../core/config/sendgrid';
import { IEmail } from '../core/interfaces/email.interface';
import { createEmail } from '../core/utils/emails/emails';

export class EmailsService {
  async send(data: IEmail): Promise<any> {
    return await sender.send(createEmail(data));
  }
}

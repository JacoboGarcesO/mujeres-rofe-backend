
import { createEmail } from '../utils/emails';
import { UserModel } from '../models/user.model';
import smg from '../config/sendgrid';

export class EmailsService {
  async send(user: UserModel): Promise<any> {
    const msg = createEmail(user.email, user.firstName, user.lastName, user.document);
    return await smg.send(msg);
  }
}

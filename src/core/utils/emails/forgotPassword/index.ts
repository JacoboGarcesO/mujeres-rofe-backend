import { IEmail } from '../../../interfaces/email.interface';
import template from './template';

export default (data: IEmail) => (
  {
    to: data.email,
    personalizations: [
      {
        to: [
          {
            email: data.email,
          },
          {
            email: 'mujeres.rofe@tocaunavida.org',
          },
        ],
      },
    ],
    from: {
      email: 'mujeres.rofe@tocaunavida.org',
      name: 'MujeresROFÉ',
    },
    subject: data.subject,
    html: template(data),
  }
);

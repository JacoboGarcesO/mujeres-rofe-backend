import { IEmail } from '../../../interfaces/email.interface';
import template from './template';

export default (data: IEmail) => (
  {
    to: data.email,
    personalizations: [
      {
        to: [
          {
            email: 'soporte@tocaunavida.org',
          },
          {
            email: 'mujeres.rofe@tocaunavida.org',
          },
          {
            email: data.email,
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

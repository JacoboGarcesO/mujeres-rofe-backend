import { TemplateEnum } from '../../models/template.enum';
import createEmail from './emails';

describe('Email utils', () => {
  test('Should return email to forgot password', () => {
    const emailData = {
      email: 'jacobogarces@gmail.com',
      firstName: 'Jacobo',
      lastName: 'Garcés Oquendo',
      subject: 'Recordatorio de credenciales para tu cuenta de Mujeres ROFÉ',
      templateId: TemplateEnum.forgotPassword,
      title: '¡Estas son tus credenciales de acceso!',
      documentNumber: '89528754',
    };

    const email = createEmail(emailData);

    expect(email).not.toBeNull();
    expect(email).not.toBeUndefined();
  });

  test('Should return email to register', () => {
    const emailData = {
      email: 'jacobogarces@gmail.com',
      firstName: 'Jacobo',
      lastName: 'Garcés Oquendo',
      subject: 'Recordatorio de credenciales para tu cuenta de Mujeres ROFÉ',
      templateId: TemplateEnum.register,
      title: '¡Estas son tus credenciales de acceso!',
      documentNumber: '89528754',
    };

    const email = createEmail(emailData);

    expect(email).not.toBeNull();
    expect(email).not.toBeUndefined();
  });

  test('Should return email to request', () => {
    const emailData = {
      email: 'jacobogarces@gmail.com',
      firstName: 'Jacobo',
      lastName: 'Garcés Oquendo',
      subject: 'Recordatorio de credenciales para tu cuenta de Mujeres ROFÉ',
      templateId: TemplateEnum.request,
      title: '¡Estas son tus credenciales de acceso!',
    };

    const email = createEmail(emailData);

    expect(email).not.toBeNull();
    expect(email).not.toBeUndefined();
  });

});

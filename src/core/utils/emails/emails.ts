import { MailDataRequired } from '@sendgrid/mail';
import { IEmail } from '../../interfaces/email.interface';
import { TemplateEnum } from '../../constants/template.enum';
import forgotPassword from './forgotPassword';
import register from './register';
import request from './request';

export const createEmail = (data: IEmail): MailDataRequired | MailDataRequired[] => {
  const tempates = {
    [TemplateEnum.forgotPassword]: forgotPassword.bind(this),
    [TemplateEnum.register]: register.bind(this),
    [TemplateEnum.request]: request.bind(this),
  };

  return tempates[data.templateId](data);
};

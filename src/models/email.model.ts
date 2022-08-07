import { TemplateEnum } from './template.enum';

export interface IEmail {
  templateId: TemplateEnum,
  subject: string,
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  documentNumber?: string;
}

import { IMedia } from './media.interface';
import { TemplateEnum } from '../constants/template.enum';

export interface IFieldRequest {
  label: string,
  placeholder: string,
  value: string,
  image?: IMedia;
  type: string;
}

export interface IRequest {
  formId: string;
  title: string;
  template: TemplateEnum;
  subject: string;
  channel: string;
  fields: IFieldRequest[],
  id: string;
}

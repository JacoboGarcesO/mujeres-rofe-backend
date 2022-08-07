import { IMedia } from './media.model';
import { TemplateEnum } from './template.enum';

export interface IFieldRequest {
  label: string,
  placeholder: string,
  value: string,
  image?: IMedia;
}

export interface IRequest {
  formId: string;
  title: string;
  template: TemplateEnum;
  subject: string;
  channel: string;
  fields: IFieldRequest[],
}

export interface IRequestResponse {
  requests: IRequest[];
  message: string;
}

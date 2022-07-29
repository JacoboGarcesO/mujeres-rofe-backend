import { IMedia } from './media.model';

export interface IFieldRequest {
  label: string,
  placeholder: string,
  value: string,
  image?: IMedia;
}

export interface IRequest {
  formId: string;
  title: string;
  template: string;
  subject: string;
  channel: string;
  fields: IFieldRequest[],
}

export interface IRequestResponse {
  requests: IRequest[];
  message: string;
}

import { MediaModel } from './media.model';

export interface FieldRequestsModel {
  label: string,
  placeholder: string,
  value: string,
  image?: MediaModel;
}

export interface RequestsModel {
  formId: string;
  title: string;
  template: string;
  subject: string;
  channel: string;
  fields: FieldRequestsModel[],
}

export interface RequestsResponseModel {
  requests: RequestsModel[];
  message: string;
}

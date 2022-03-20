export interface FieldRequestsModel {
  label: string,
  placeholder: string,
  value: string,
}

export interface RequestsModel {
  formId: string;
  title: string;
  template: string;
  subject: string;
  fields: FieldRequestsModel[],
}

export interface RequestsResponseModel {
  requests: RequestsModel[];
  message: string;
}

export interface fieldRequestsModel {
  label: string,
  placeholder: string,
  value: string,
}

export interface RequestsModel {
  formId: string;
  title: string;
  template: string;
  subject: string;
  links: fieldRequestsModel[],
}

export interface RequestsResponseModel {
  requests: RequestsModel[];
  message: string;
}

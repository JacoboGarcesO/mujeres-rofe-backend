export interface fieldFormRequestsModel {
  label: string,
  placeholder: string,
}

export interface FormRequestsModel {
  title: string;
  template: string;
  subject: string;
  links: fieldFormRequestsModel[],
}

export interface FormRequestsResponseModel {
  forms: FormRequestsModel[];
  message: string;
}

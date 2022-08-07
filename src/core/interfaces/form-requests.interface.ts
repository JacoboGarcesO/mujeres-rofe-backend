export interface IFormRequest {
  title: string;
  template: string;
  subject: string;
  links: IFieldFormRequest[],
}

export interface IFormRequestResponse {
  forms: IFormRequest[];
  message: string;
}

interface IFieldFormRequest {
  label: string,
  placeholder: string,
}

export interface IFormRequest {
  id: string;
  title: string;
  template: string;
  subject: string;
  links: IFieldFormRequest[];
}

interface IFieldFormRequest {
  label: string;
  placeholder: string;
}

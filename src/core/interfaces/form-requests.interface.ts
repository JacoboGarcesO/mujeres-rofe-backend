export interface IFormRequest {
  id: string;
  title: string;
  template: string;
  subject: string;
  fields: IFieldFormRequest[];
  description: string;
}

interface IFieldFormRequest {
  label: string;
  placeholder: string;
  type: string;
  options: {
    _id: string;
    label: string;
  }[];
}

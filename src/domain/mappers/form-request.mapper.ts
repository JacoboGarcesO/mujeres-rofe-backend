import { IFormRequest } from '../../core/interfaces/form-requests.interface';

export class FormRequestMapper {
  toFormRequest(formRequest: any): IFormRequest {
    return {
      id: formRequest?.id,
      fields: formRequest?.fields,
      subject: formRequest?.subject,
      template: formRequest?.template,
      title: formRequest?.title,
      description: formRequest?.description,
    };
  }
}

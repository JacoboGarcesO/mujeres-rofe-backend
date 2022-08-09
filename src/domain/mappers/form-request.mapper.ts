import { IFormRequest } from '../../core/interfaces/form-requests.interface';

export class FormRequestMapper {
  toFormRequest(formRequest: any): IFormRequest {
    return {
      id: formRequest?.id,
      links: formRequest?.links,
      subject: formRequest?.subject,
      template: formRequest?.template,
      title: formRequest?.title,
    };
  }
}

import { UploadApiResponse } from 'cloudinary';
import { IFieldRequest, IRequest } from '../models/requests.model';
import { toTemplateEnum } from '../models/template.enum';

export class RequestMapper {
  toRequest(request: any, media: UploadApiResponse | undefined): IRequest {
    return {
      formId: request?.requestFormId,
      title: request?.requestTitle,
      subject: request?.requestSubject,
      template: toTemplateEnum(request?.requestTemplate),
      channel: request?.requestChannel,
      fields: this.getFields(JSON.parse(request?.requestFields), media),
    };
  }

  private getFields(fields: any[], media: UploadApiResponse | undefined): IFieldRequest[] {
    return fields.map((field) => {
      if (field?.type === 'image') {
        return {
          label: field?.label,
          placeholder: field?.placeholder,
          value: field?.value,
          type: field?.type,
          image: {
            _id: media?.public_id,
            url: media?.secure_url,
            type: media?.format,
          },
        };
      }

      return {
        label: field?.label,
        type: field?.type,
        placeholder: field?.placeholder,
        value: field?.value,
      };
    });
  }
}

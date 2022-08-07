import { IResponse } from '../../core/interfaces/response.interface';

export class ResponseMapper<T> {
  public toResponse(data: T | null, message: string): IResponse<T> {
    return {
      result: data,
      message,
    };
  }
}

import { ModifyResult } from 'mongoose';
import { IFilter, IResponse } from '../../core/interfaces/response.interface';

export class ResponseMapper<T> {
  public toResponse(
    data:  T | ModifyResult<T> | null,
    message: string,
    token?: string,
    filter?: IFilter,
  ): IResponse<T> {
    return {
      result: data,
      message,
      filter,
      token,
    };
  }
}

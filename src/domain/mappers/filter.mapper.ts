import { IFilter } from '../../core/interfaces/response.interface';

export class FilterMapper {
  public toFilter(data: any): IFilter {
    return {
      from: Number(data?.from),
      limit: Number(data?.limit),
      sort: data?.sort,
      term: data?.term ? { [Object.keys(data.term)[0]]: new RegExp(data.term[Object.keys(data.term)[0]]) } : null,
      total: Number(data?.total),
    };
  }
}

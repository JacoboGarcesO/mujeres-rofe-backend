import { IFilter } from '../../core/interfaces/response.interface';

export class FilterMapper {
  public toFilter(data: any): IFilter {
    return {
      from: data?.from,
      limit: data?.limit,
      sort: data?.sort,
      term: { [Object.keys(data.term)[0]]: new RegExp(data.term[Object.keys(data.term)[0]]) },
      total: data?.total,
    };
}
}

import { IFilter } from '../../core/interfaces/response.interface';

export class FilterMapper {
  public toFilter(data: any): IFilter {
    return {
      from: data?.from,
      limit: data?.limit,
      sort: data?.sort,
      term: data?.term,
      total: data?.total,
    };
  }
}

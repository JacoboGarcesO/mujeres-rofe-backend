export interface IResponse<T> {
  result: T | null;
  message: string;
  filter?: IFilter;
  token?: string;
}

export interface IFilter {
  from: number;
  limit: number;
  term: any;
  sort: any;
  total?: number;
}

import { IFilter } from '../../core/interfaces/response.interface';

export class FilterMapper {
  public toFilter(data: any): IFilter {
    let term = {};

    data?.term && Object.entries(data?.term).forEach((entry) => {
      const [key, value] = entry;
      if (key !== 'firstName') { return term = { ...term, [key]: value }; }
      term = { ...term, [key]: new RegExp(value as string) };
    });

    return {
      term,
      from: Number(data?.from),
      limit: Number(data?.limit),
      sort: data?.sort,
      total: Number(data?.total),
    };
  }

  public toTerm(term: { [key: string]: string | RegExp }): { [key: string]: string } | null {
    let accumulatorTerm = {};

    Object.entries(term).forEach((entry) => {
      const [key, value] = entry;
      if (value instanceof RegExp) {
        
        const stringRegex = RegExp(value).toString();
        return accumulatorTerm = { ...accumulatorTerm, [key]: stringRegex.substring(1, stringRegex.length - 1) }; 
      }

      accumulatorTerm = { ...accumulatorTerm, [key]: value };
    });
    
    return Object.entries(accumulatorTerm).length ? accumulatorTerm : null;
  }
}

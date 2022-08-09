import { IState } from '../../core/interfaces/locations.interface';

export class HighlightedCityMapper {
  toHighlightedCity(highlightedCity: any): IState {
    return {
      _id: highlightedCity?.id,
      name: highlightedCity?.name,
    };
  }
}

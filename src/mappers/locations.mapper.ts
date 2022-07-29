import { ICityResponse, ICity, IState, IStateResponse } from '../models/locations.model';

export class LocationsMapper {
  citiesToDto(cities: ICity[], message: string): ICityResponse {
    return {
      cities,
      message,
    };
  }

  statesToDto(states: IState[], message: string): IStateResponse {
    return {
      states,
      message,
    };
  }
}

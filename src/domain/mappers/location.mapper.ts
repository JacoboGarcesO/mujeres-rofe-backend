import { ICityResponse, ICity, IState, IStateResponse } from '../../core/interfaces/locations.interface';

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

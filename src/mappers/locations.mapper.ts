import { CitesResponseModel, CityModel, StateModel, StatesResponseModel } from '../models/locations.model';

export class LocationsMapper {
  citiesToDto(cities: CityModel[], message: string): CitesResponseModel {
    return {
      cities,
      message,
    };
  }

  statesToDto(states: StateModel[], message: string): StatesResponseModel {
    return {
      states,
      message,
    };
  }
}

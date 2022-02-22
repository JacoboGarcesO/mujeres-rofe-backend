export interface CityModel {
  stateId: string;
  name: string;
}

export interface LocationModel {
  state: string;
  city: string;
  cityName: string;
}

export interface StateModel {
  name: string;
  _id: string;
}

export interface CitesResponseModel {
  cities: CityModel[];
  message: string;
}

export interface StatesResponseModel {
  states: StateModel[];
  message: string;
}

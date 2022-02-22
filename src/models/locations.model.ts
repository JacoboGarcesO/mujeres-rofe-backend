export interface CityModel {
  stateId: string;
  name: string;
}

export interface LocationModel {
  state: string;
  city: string;
  citiName: string;
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

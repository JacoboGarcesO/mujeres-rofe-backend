export interface ICity {
  stateId: string;
  name: string;
}

export interface ILocation {
  state: string;
  city: string;
  cityName: string;
}

export interface IState {
  name: string;
  _id: string;
}

export interface ICityResponse {
  cities: ICity[];
  message: string;
}

export interface IStateResponse {
  states: IState[];
  message: string;
}

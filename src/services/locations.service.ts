import citiesCollection from '../data/models/city.model';
import statesCollection from '../data/models/state.model';
import { LocationsMapper } from '../domain/mappers/location.mapper';
import { MessagesMapper } from '../domain/mappers/messages.mapper';
import { ICityResponse, IStateResponse } from '../core/interfaces/locations.interface';
import { IMessage } from '../core/interfaces/message.interface';
import { messages } from '../core/utils/messages';

export class LocationsService {
  private locationsMapper: LocationsMapper;
  private messageMapper: MessagesMapper;

  constructor(locationsMapper: LocationsMapper, messageMapper: MessagesMapper) {
    this.locationsMapper = locationsMapper;
    this.messageMapper = messageMapper;
  }

  async getStates(): Promise<IStateResponse | IMessage> {
    const states = await statesCollection.find();

    if (!states?.length) {
      return this.messageMapper.map(messages.getAllFailure('states'));
    }

    return this.locationsMapper.statesToDto(states, messages.getAll('states'));
  }

  async getCitiesByState(stateId: any): Promise<IStateResponse | IMessage> {
    const cities = await citiesCollection.find({ stateId });

    if (!cities?.length) {
      return this.messageMapper.map(messages.getAllFailure('cities'));
    }

    return this.locationsMapper.citiesToDto(cities, messages.getAll('cities'));
  }

  async getCities(): Promise<ICityResponse | IMessage> {
    const cities = await citiesCollection.find();

    if (!cities?.length) {
      return this.messageMapper.map(messages.getAllFailure('cities'));
    }

    return this.locationsMapper.citiesToDto(cities, messages.getAll('cities'));
  }
}

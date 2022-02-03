import citiesCollection from '../collections/cities.collection';
import statesCollection from '../collections/states.collection';
import { LocationsMapper } from '../mappers/locations.mapper';
import { MessagesMapper } from '../mappers/messages.mapper';
import { StatesResponseModel } from '../models/locations.model';
import { MessageModel } from '../models/message.model';
import messages from '../utils/messages';

export class LocationsService {
  private locationsMapper: LocationsMapper;
  private messageMapper: MessagesMapper;

  constructor(locationsMapper: LocationsMapper, messageMapper: MessagesMapper) {
    this.locationsMapper = locationsMapper;
    this.messageMapper = messageMapper;
  }

  async getStates(): Promise<StatesResponseModel | MessageModel> {
    const states = await statesCollection.find();

    if (!states?.length) {
      return this.messageMapper.map(messages.getAllFailure('states'));
    }

    return this.locationsMapper.statesToDto(states, messages.getAll('states'));
  }

  async getCitiesByState(stateId: any): Promise<StatesResponseModel | MessageModel> {
    const cities = await citiesCollection.find({stateId});

    if (!cities?.length) {
      return this.messageMapper.map(messages.getAllFailure('cities'));
    }

    return this.locationsMapper.statesToDto(cities, messages.getAll('cities'));
  }
  
}

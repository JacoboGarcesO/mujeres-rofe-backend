import highlightedCitiesCollection from '../collections/highlighted-cities.collection';
import { MessagesMapper } from '../mappers/messages.mapper';
import { IState, IStateResponse } from '../models/locations.model';
import { IMessage } from '../models/message.model';
import messages from '../utils/messages';

export class HighlightedCityService {
  private messageMapper: MessagesMapper;

  constructor(messageMapper: MessagesMapper) {
    this.messageMapper = messageMapper;
  }

  async getAll(): Promise<IStateResponse | IMessage> {
    const cities: IState[] = await highlightedCitiesCollection.find().sort({ name: 1 });

    if (!cities?.length) {
      return this.messageMapper.map(messages.getAllFailure('Highlighted cities'));
    }

    const message = messages.getAll('Highlighted cities');
    return { states: cities, message };
  }


  async create(state: any): Promise<IStateResponse> {
    const cityCreated = await new highlightedCitiesCollection(state).save();
    const message = messages.createSuccess('Highlighted city');
    return { states: [cityCreated], message };
  }

  async delete(cityId: any): Promise<IStateResponse | IMessage> {
    const city = await highlightedCitiesCollection.findByIdAndDelete(cityId);

    if (!city) {
      return this.messageMapper.map(messages.deleteFailure('Highlighted city'));
    }

    const message = messages.deleteSuccess('Highlighted city');
    return { states: [city], message };
  }
}

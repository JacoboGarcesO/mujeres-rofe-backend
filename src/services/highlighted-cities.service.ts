import highlightedCitiesCollection from '../collections/highlighted-cities.collection';
import { MessagesMapper } from '../mappers/messages.mapper';
import { StateModel, StatesResponseModel } from '../models/locations.model';
import { MessageModel } from '../models/message.model';
import messages from '../utils/messages';

export class HighlightedCityService {
  private messageMapper: MessagesMapper;

  constructor(messageMapper: MessagesMapper) {
    this.messageMapper = messageMapper;
  }

  async getAll(): Promise<StatesResponseModel | MessageModel> {
    const cities: StateModel[] = await highlightedCitiesCollection.find();

    if (!cities?.length) {
      return this.messageMapper.map(messages.getAllFailure('Highlighted cities'));
    }

    const message = messages.getAll('Highlighted cities');
    return { states: cities, message };
  }


  async create(state: any): Promise<StatesResponseModel> {
    const cityCreated = await new highlightedCitiesCollection(state).save();
    const message = messages.createSuccess('Highlighted city');
    return { states: [cityCreated], message };
  }

  async update(city: any): Promise<StatesResponseModel | MessageModel> {
    const cityUpdated = await highlightedCitiesCollection.findByIdAndUpdate(city?._id, { $set: city }, { new: true });
    const message = messages.updateSuccess('Highlighted city');

    return { states: [cityUpdated], message };
  }

  async delete(cityId: any): Promise<MessageModel> {
    const city = await highlightedCitiesCollection.findByIdAndDelete(cityId);

    if (!city) {
      return this.messageMapper.map(messages.deleteFailure('Highlighted city'));
    }

    const message = messages.deleteSuccess('Highlighted city');
    return { message };
  }
}

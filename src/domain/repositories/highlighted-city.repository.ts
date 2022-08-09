import { IState } from '../../core/interfaces/locations.interface';
import { MongooseSource } from '../../data/mongoose.source';

export class HighlightedCityRepository {
  private db: MongooseSource<IState>;

  constructor(db: MongooseSource<IState>) { this.db = db; }

  public async getHighlightedCities(): Promise<IState[]> {
    return await this.db.findAll({}, {});
  }

  public async createHighlightedCity(highlightedCity: IState): Promise<IState> {
    return await this.db.create(highlightedCity);
  }

  public async deleteHighlightedCity(highlightedCityId: string): Promise<IState | null> {
    return await this.db.delete(highlightedCityId);
  }
}

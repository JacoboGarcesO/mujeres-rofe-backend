import { ICity } from '../../core/interfaces/locations.interface';
import { MongooseSource } from '../../data/mongoose.source';

export class CityRepository {
  private db: MongooseSource<ICity>;

  constructor(db: MongooseSource<ICity>) { this.db = db; }

  public async getCities(filter: any): Promise<ICity[]> {
    return await this.db.findAll(filter, {});
  }
}

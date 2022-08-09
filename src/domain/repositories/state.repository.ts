import { IState } from '../../core/interfaces/locations.interface';
import { MongooseSource } from '../../data/mongoose.source';

export class StateRepository {
  private db: MongooseSource<IState>;

  constructor(db: MongooseSource<IState>) { this.db = db; }

  public async getStates(): Promise<IState[]> {
    return await this.db.findAll({}, {});
  }
}

import { IFormRequest } from '../../core/interfaces/form-requests.interface';
import { MongooseSource } from '../../data/mongoose.source';

export class FormRequestRepository {
  private db: MongooseSource<IFormRequest>;

  constructor(db: MongooseSource<IFormRequest>) { this.db = db; }

  public async getFormRequests(): Promise<IFormRequest[]> {
    return await this.db.findAll({}, {});
  }

  public async getFormRequestById(formRequestId: string): Promise<IFormRequest | null> {
    return await this.db.findById(formRequestId);
  }

  public async createFormRequest(formRequest: IFormRequest): Promise<IFormRequest> {
    return await this.db.create(formRequest);
  }

  public async updateChannel(formRequest: IFormRequest): Promise<IFormRequest | null> {
    return await this.db.update(formRequest.id, formRequest);
  }

  public async deleteChannel(formRequestId: string): Promise<IFormRequest | null> {
    return await this.db.delete(formRequestId);
  }
}

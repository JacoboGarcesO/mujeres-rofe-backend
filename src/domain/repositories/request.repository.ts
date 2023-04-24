import { ModifyResult } from 'mongoose';
import { IRequest } from '../../core/interfaces/requests.interface';
import { MongooseSource } from '../../data/mongoose.source';

export class RequestRepository {
  private db: MongooseSource<IRequest>;

  constructor(db: MongooseSource<IRequest>) { this.db = db; }

  public async getRequests(sorter: any): Promise<IRequest[]> {
    return await this.db.findAll({}, sorter);
  }

  public async getRequestById(requestId: string): Promise<IRequest | null> {
    return await this.db.findById(requestId);
  }

  public async createRequest(request: IRequest): Promise<IRequest> {
    return await this.db.create(request);
  }

  public async updateRequest(request: IRequest): Promise<ModifyResult<IRequest> | null> {
    return await this.db.update(request.id, request);
  }

  public async deleteRequest(requestId: string): Promise<IRequest | null> {
    return await this.db.delete(requestId);
  }
}

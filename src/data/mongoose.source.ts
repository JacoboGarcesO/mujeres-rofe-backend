import { HydratedDocument, Model } from 'mongoose';
import { IFilter } from '../core/interfaces/response.interface';

export class MongooseSource<T> {
  private model: Model<any>;

  constructor(model: Model<any>) { this.model = model; }

  public async create(data: T): Promise<T> {
    return await this.model.create(data);
  }

  public async update(id: string, data: T): Promise<Awaited<T> | null> {
    return await this.model.findByIdAndUpdate(id, { $set: data }, { new: true });
  }

  public async delete(id: string): Promise<Awaited<T> | null> {
    return await this.model.findByIdAndDelete(id);
  }

  public async findOne(data: any): Promise<Awaited<T> | null> {
    return await this.model.findOne(data);
  }

  public async findById(id: string): Promise<Awaited<T> | null> {
    return await this.model.findById(id);
  }

  public async findAll(filter: any, sorter: any): Promise<HydratedDocument<T>[]> {
    return await this.model.find(filter).sort(sorter);
  }

  public async findPaginated(filter: IFilter): Promise<HydratedDocument<T>[]> {
    return await this.model.find({[Object.keys(filter.term)[0]]: new RegExp(filter.term[Object.keys(filter.term)[0]])}).skip(filter.from).limit(filter.limit).sort(filter.sort);
  }

  public async count(): Promise<number> {
    return await this.model.countDocuments();
  }
}

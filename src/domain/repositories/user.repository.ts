import { IFilter } from '../../core/interfaces/response.interface';
import { IUser } from '../../core/interfaces/user.interface';
import { MongooseSource } from '../../data/mongoose.source';

export class UserRepository {
  private db: MongooseSource<IUser>;

  constructor(db: MongooseSource<IUser>) { this.db = db; }

  public async getUsers(filter: IFilter): Promise<IUser[]> {
    return await this.db.findPaginated(filter);
  }

  public async getUserById(userId: string): Promise<IUser | null> {
    return await this.db.findById(userId);
  }

  public async createUser(user: IUser): Promise<IUser> {
    return await this.db.create(user);
  }

  public async updateUser(user: IUser): Promise<IUser | null> {
    return await this.db.update(user.id, user);
  }

  public async deleteUser(userId: string): Promise<IUser | null> {
    return await this.db.delete(userId);
  }

  public async getUserByEmail(email: string): Promise<IUser | null> {
    return await this.db.findOne({ email });
  }

  public async getTotalUsers(filter: { [key: string]: string }): Promise<number> {
    return await this.db.count(filter);
  }

  public async isEmailDuplicated(email: string): Promise<boolean | null> {
    return !!await this.db.findOne({ email });
  }

  public async isDocumentDuplicated(documentNumber: string): Promise<boolean | null> {
    return !!await this.db.findOne({ documentNumber });
  }
}

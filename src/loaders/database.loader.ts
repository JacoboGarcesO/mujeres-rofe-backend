import { connect, Mongoose } from 'mongoose';
import environment from '../config/environment';

export default class Database {
  public async connect(): Promise<Mongoose> {
    return connect(environment.databaseUrl.dev);
  }
}
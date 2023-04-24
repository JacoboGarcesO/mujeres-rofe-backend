import mongoose, { connect, Mongoose } from 'mongoose';
import { environment } from '../config/environment';

export default class Database {
  public async connect(): Promise<Mongoose> {
    mongoose.set('strictQuery', true);
    return connect(
      environment.isProduction
        ? environment.databaseUrl.prod
        : environment.databaseUrl.dev,
    );
  }
}

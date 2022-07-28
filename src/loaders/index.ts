import { Application } from 'express';
import { log } from '../utils/logs';
import Server from './server';
import databaseLoader from './database';
import routesLoader from './routes';

export default async (app: Application) => {
  const server = new Server(app);
  await server.init();
  await routesLoader(app);
  databaseLoader.then(() => server.start()).catch(log.bind(this));
};

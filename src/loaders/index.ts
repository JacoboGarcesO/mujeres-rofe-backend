import { Application } from 'express';
import { log } from '../utils/logs';
import applicationLoader, { startServer } from './application';
import databaseLoader from './database';
import routesLoader from './routes';

export default async (app: Application) => {
  await applicationLoader(app);
  await routesLoader(app);
  databaseLoader.then(startServer.bind(this, app)).catch(log.bind(this));
};

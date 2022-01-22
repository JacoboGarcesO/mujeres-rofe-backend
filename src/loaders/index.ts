import { Application } from 'express';
import { log } from '../utils/logs';
import applicationLoader, { startServer } from './application';
import databaseLoader from './database';

export default async (app: Application) => {
  await applicationLoader(app);
  databaseLoader.then(startServer.bind(this, app)).catch(log.bind(this));
}
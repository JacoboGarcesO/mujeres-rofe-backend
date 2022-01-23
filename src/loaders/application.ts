import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { log } from '../utils/logs';
import environment from '../config/environment';

export const startServer = (app: Application) => {
  app.listen(app.get('port'), log.bind(this, `Server running in port ${app.get('port')}`));
}

export default async (app: Application) => {
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false, limit: '50mb' }));
  app.set('port', environment.port || 3005);

  return app;
};

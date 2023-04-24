import winston, { createLogger, format, transports } from 'winston';
import 'winston-mongodb';
import { environment } from '../config/environment';

export class Logger {
  private logger: winston.Logger;

  constructor() {
    const db = environment.isProduction ? environment.databaseUrl.prod : environment.databaseUrl.dev;
    this.logger = createLogger({
      level: 'info',
      format: format.json(),
      transports: [
        new transports.MongoDB({
          db,
          options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
          },
          collection: 'Logs',
          expireAfterSeconds: 1296000 // 15 days
        }),
      ],
    });
  }

  public createInfoLog(message: string, data?: any): winston.Logger {
    return this.logger.info(message, { metadata: data });
  }

  public createErrorLog(message: string, data?: any): winston.Logger {
    return this.logger.error(message, { metadata: data });
  }
}

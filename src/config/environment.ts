import { resolve } from 'path';
import { config } from 'dotenv';

config({ path: resolve(__dirname, '../../.env') });

export default {
  port: process.env.PORT,
  databaseUrl: {
    dev: process.env.DATABASE_URI_DEV as string,
    prod: process.env.DATABASE_URI_PROD as string,
  },
};

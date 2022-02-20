import { resolve } from 'path';
import { config } from 'dotenv';

config({ path: resolve(__dirname, '../../.env') });

export default {
  port: process.env.PORT,
  jwtPassword: process.env.JWT_PSW as string,
  databaseUrl: {
    dev: process.env.DATABASE_URI_DEV as string,
    prod: process.env.DATABASE_URI_PROD as string,
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME as string, 
    apiKey: process.env.CLOUDINARY_API_KEY as string, 
    apiSecret: process.env.CLOUDINARY_API_SECRET as string, 
  },
  sendgridApiKey: process.env.SENDGRID_API_KEY as string, 
};

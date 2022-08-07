export interface IEnvironment {
  isProduction: boolean;
  port: string;
  jwtPassword: string;
  databaseUrl: {
    dev: string;
    prod: string;
  };
  cloudinary: {
    cloudName: string; 
    apiKey: string;
    apiSecret: string;
  };
  sendgridApiKey: string;
}

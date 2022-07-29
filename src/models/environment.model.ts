export interface IEnvironment {
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

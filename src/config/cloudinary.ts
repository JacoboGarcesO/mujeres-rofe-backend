import cloudinary from 'cloudinary';
import environment from './environment';

cloudinary.v2.config({
  cloud_name: environment.cloudinary.cloudName,
  api_key: environment.cloudinary.apiKey,
  api_secret: environment.cloudinary.apiSecret,
});

export default cloudinary.v2.uploader;

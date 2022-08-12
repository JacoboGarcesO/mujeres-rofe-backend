import { UploadApiResponse } from 'cloudinary';
import { IMedia } from '../interfaces/media.interface';

export const getMedia = (newMedia: UploadApiResponse | undefined, media: IMedia): IMedia => {    
  if (!!media && !newMedia) { return media; }

  return {
    _id: newMedia?.public_id as string,
    url: newMedia?.secure_url,
    type: newMedia?.format,
  };
};

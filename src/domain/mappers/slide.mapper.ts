import { UploadApiResponse } from 'cloudinary';
import { IMedia } from '../../core/interfaces/media.interface';
import { ISlide } from '../../core/interfaces/slide.interface';

export class SlideMapper {
  toSlide(slide: any, image: any): ISlide {
    return {
      title: slide?.title,
      image: this.getMedia(image, JSON.parse(slide?.imageEncoded || '{}')),
      url: slide?.url,
      id: slide?.id,
    };
  }

  private getMedia(newMedia: UploadApiResponse | undefined, media: IMedia): IMedia {    
    if (!!media && !newMedia) { return media; }

    return {
      _id: newMedia?.public_id as string,
      url: newMedia?.secure_url,
      type: newMedia?.format,
    };
  }
  
}

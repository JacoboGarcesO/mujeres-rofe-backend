import { UploadApiResponse } from 'cloudinary';
import { IMedia } from '../models/media.model';
import { ISlide, ISlideResponse } from '../models/slide.model';

export class SlideMapper {

  dtoToSlide(slide: any, image: any): ISlide {
    return {
      title: slide?.title,
      image: this.getMedia(image, JSON.parse(slide?.imageEncoded || '{}')),
      url: slide?.url,
      id: slide?.id,
    };
  }

  slideToDto(slide: ISlide, message: string): ISlideResponse {
    return {
      slides: [slide],
      message,
    };
  }

  slidesToDto(slides: ISlide[], message: string): ISlideResponse {
    return {
      slides,
      message,
    };
  }

  private getMedia(newMedia: UploadApiResponse | undefined, media: IMedia): IMedia {    
    if (!!media && !newMedia) { return media; }

    return {
      _id: newMedia?.public_id,
      url: newMedia?.secure_url,
      type: newMedia?.format,
    };
  }
  
}

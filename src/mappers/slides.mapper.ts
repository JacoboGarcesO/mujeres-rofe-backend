import { UploadApiResponse } from 'cloudinary';
import { MediaModel } from '../models/media.model';
import { SlideModel, SlideResponseModel } from '../models/slide.model';

export class SlideMapper {

  dtoToSlide(slide: any, image: any): SlideModel {
    return {
      title: slide?.title,
      image: this.getMedia(image, JSON.parse(slide?.imageEncoded || '{}')),
      url: slide?.url,
      id: slide?.id,
    };
  }

  slideToDto(slide: SlideModel, message: string): SlideResponseModel {
    return {
      slides: [slide],
      message,
    };
  }

  slidesToDto(slides: SlideModel[], message: string): SlideResponseModel {
    return {
      slides,
      message,
    };
  }

  private getMedia(newMedia: UploadApiResponse | undefined, media: MediaModel): MediaModel {    
    if (!!media && !newMedia) { return media; }

    return {
      _id: newMedia?.public_id,
      url: newMedia?.secure_url,
      type: newMedia?.format,
    };
  }
  
}

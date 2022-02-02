import { SlideModel, SlideResponseModel } from '../models/slide.model';

export class SlideMapper {

  dtoToSlide(slide: any, image: any): SlideModel {
    return {
      title: slide?.title,
      image: image && {
        _id: image?.public_id,
        url: image?.url,
      },
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
}

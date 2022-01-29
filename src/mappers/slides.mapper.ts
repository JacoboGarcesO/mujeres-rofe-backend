import { SlideModel, SlideResponseModel } from '../models/slide.model';

export class SlideMapper {

  dtoToSlide(slide: any): SlideModel {
    return {
      title: slide?.title,
      image: slide?.image,
      url: slide?.url,
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

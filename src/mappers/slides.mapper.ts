import { SlideModel, SlideRequestModel } from '../models/slide.model';

export class SlideMapper {

  dtoToSlide(slide: any): SlideModel {
    return {
      title: slide?.title,
      image: slide?.image,
      url: slide?.url,
    };
  }

  slideToDto(slide: any, message: string): SlideRequestModel {
    return {
      slide,
      message,
    };
  }
}

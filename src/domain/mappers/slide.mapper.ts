import { UploadApiResponse } from 'cloudinary';
import { ISlide } from '../../core/interfaces/slide.interface';
import { getMedia } from '../../core/utils/get-media.util';

export class SlideMapper {
  toSlide(slide: any, image: UploadApiResponse | undefined): ISlide {
    return {
      title: slide?.title,
      image: getMedia(image, JSON.parse(slide?.imageEncoded || '{}')),
      url: slide?.url,
      id: slide?.id,
    };
  }
}

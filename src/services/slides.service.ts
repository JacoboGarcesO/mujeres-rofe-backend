import slidesCollection from '../collections/slides.collection';
import { SlideMapper } from '../mappers/slides.mapper';
import { SlideRequestModel } from '../models/slide.model';
import messages from '../utils/messages';

export class SlideService {
  private slideMapper: SlideMapper;

  constructor(mapper: SlideMapper) { this.slideMapper = mapper; }

  async create(slideDto: any): Promise<SlideRequestModel> {
    const slide = this.slideMapper.dtoToSlide(slideDto);
    const slideCreated = await new slidesCollection(slide).save();
    const slideRequest = this.slideMapper.slideToDto(slideCreated, messages.createSuccess('slide'));

    return slideRequest;
  }
}

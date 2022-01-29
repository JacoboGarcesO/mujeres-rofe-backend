import slidesCollection from '../collections/slides.collection';
import { MessagesMapper } from '../mappers/messages.mapper';
import { SlideMapper } from '../mappers/slides.mapper';
import { MessageModel } from '../models/message.model';
import { SlideModel, SlideResponseModel } from '../models/slide.model';
import messages from '../utils/messages';

export class SlideService {
  private slideMapper: SlideMapper;
  private messageMapper: MessagesMapper;

  constructor(mapper: SlideMapper, messageMapper: MessagesMapper) {
    this.slideMapper = mapper;
    this.messageMapper = messageMapper;
  }

  async getAll(): Promise<SlideResponseModel | MessageModel> {
    const slides: SlideModel[] = await slidesCollection.find();

    if (!slides?.length) {
      return this.messageMapper.map(messages.getAllFailure('slides'));
    }

    return this.slideMapper.slidesToDto(slides, messages.getAll('slides'));
  }

  async create(slideDto: any): Promise<SlideResponseModel> {
    const slide = this.slideMapper.dtoToSlide(slideDto);
    const slideCreated = await new slidesCollection(slide).save();
    const slideRequest = this.slideMapper.slideToDto(slideCreated, messages.createSuccess('slide'));

    return slideRequest;
  }
}

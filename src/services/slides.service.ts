import slidesCollection from '../data/models/slide.model';
import cloudinary from '../core/config/cloudinary';
import { MessagesMapper } from '../domain/mappers/messages.mapper';
import { SlideMapper } from '../domain/mappers/slide.mapper';
import { IMessage } from '../core/interfaces/message.interface';
import { ISlide, ISlideResponse } from '../core/interfaces/slide.interface';
import { messages } from '../core/utils/messages';

export class SlideService {
  private slideMapper: SlideMapper;
  private messageMapper: MessagesMapper;

  constructor(mapper: SlideMapper, messageMapper: MessagesMapper) {
    this.slideMapper = mapper;
    this.messageMapper = messageMapper;
  }

  async getAll(): Promise<ISlideResponse | IMessage> {
    const slides: ISlide[] = await slidesCollection.find();

    if (!slides?.length) {
      return this.messageMapper.map(messages.getAllFailure('slides'));
    }

    return this.slideMapper.slidesToDto(slides, messages.getAll('slides'));
  }

  async getById(slideId: any): Promise<ISlideResponse | IMessage> {
    const slide = await slidesCollection.findById(slideId);

    if (!slide) {
      return this.messageMapper.map(messages.getByIdFailure('slides'));
    }

    return this.slideMapper.slideToDto(slide, messages.getById('slides'));
  }

  async create(slideDto: any, slideImage: any): Promise<ISlideResponse> {
    let image;

    if (slideImage) {
      image = await cloudinary.upload(slideImage);
    }

    const slide = this.slideMapper.dtoToSlide(slideDto, image);
    const slideCreated = await new slidesCollection(slide).save();
    const slideRequest = this.slideMapper.slideToDto(slideCreated, messages.createSuccess('slide'));

    return slideRequest;
  }

  async update(slideDto: any, slideImage: any): Promise<ISlideResponse | IMessage> {
    let image;

    if (slideImage) {
      if (slideDto?.image?._id) {
        await cloudinary.upload(slideDto?.image._id);
      }

      image = await cloudinary.upload(slideImage);
    }

    const slide = this.slideMapper.dtoToSlide(slideDto, image);
    const slideUpdated = await slidesCollection.findByIdAndUpdate(slide?.id, { $set: slide }, { new: true });
    const slideResponse = this.slideMapper.slideToDto(slideUpdated, messages.updateSuccess('slide'));
    return slideResponse;
  }

  async delete(slideId: any): Promise<IMessage> {
    const slide = await slidesCollection.findByIdAndDelete(slideId);

    if (!slide) {
      return this.messageMapper.map(messages.deleteFailure('slide'));
    }

    await cloudinary.destroy(slide.image._id);

    return this.slideMapper.slideToDto(slide, messages.deleteSuccess('slide'));
  }
}

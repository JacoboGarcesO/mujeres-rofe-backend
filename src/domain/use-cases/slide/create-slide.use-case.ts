import { cdn } from '../../../core/config/cloudinary';
import { IResponse } from '../../../core/interfaces/response.interface';
import { ISlide } from '../../../core/interfaces/slide.interface';
import { messages } from '../../../core/utils/messages';
import { ResponseMapper } from '../../mappers/response.mapper';
import { SlideMapper } from '../../mappers/slide.mapper';
import { SlideRepository } from '../../repositories/slide.repository';

export class CreateSlideUseCase {
  private repository: SlideRepository;
  private slideMapper: SlideMapper;
  private responseMapper: ResponseMapper<ISlide>;

  constructor(
    repository: SlideRepository,
    slideMapper: SlideMapper,
    responseMapper: ResponseMapper<ISlide>,
  ) {
    this.repository = repository;
    this.slideMapper = slideMapper;
    this.responseMapper = responseMapper;
  }

  public async execute(data: any, media: any): Promise<IResponse<ISlide>> {
    let image;

    if (media) { image = await cdn.upload(media); }   

    const slide = this.slideMapper.toSlide(data, image);
    const slideCreated = await this.repository.createSlide(slide);
    return this.responseMapper.toResponse(slideCreated, messages.createSuccess('slide'));
  }
}

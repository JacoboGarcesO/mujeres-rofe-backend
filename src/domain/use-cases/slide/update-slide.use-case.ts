import { cdn } from '../../../core/config/cloudinary';
import { IResponse } from '../../../core/interfaces/response.interface';
import { ISlide } from '../../../core/interfaces/slide.interface';
import { messages } from '../../../core/utils/messages';
import { ResponseMapper } from '../../mappers/response.mapper';
import { SlideMapper } from '../../mappers/slide.mapper';
import { SlideRepository } from '../../repositories/slide.repository';

export class UpdateSlideUseCase {
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
    const imageEncoded = JSON.parse(data.imageEncoded);
    let image;

    if (media) {      
      if (imageEncoded?._id) {
        await cdn.destroy(imageEncoded._id);
      }

      image = await cdn.upload(media);
    }

    const slide = this.slideMapper.toSlide(data, image);
    const slideUpdated = await this.repository.updateSlide(slide);
    return this.responseMapper.toResponse(slideUpdated, messages.updateSuccess('slide'));
  }
}

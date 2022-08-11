import { cdn } from '../../../core/config/cloudinary';
import { IResponse } from '../../../core/interfaces/response.interface';
import { ISlide } from '../../../core/interfaces/slide.interface';
import { messages } from '../../../core/utils/messages';
import { ResponseMapper } from '../../mappers/response.mapper';
import { SlideRepository } from '../../repositories/slide.repository';

export class DeleteSlideUseCase {
  private repository: SlideRepository;
  private responseMapper: ResponseMapper<ISlide>;

  constructor(
    repository: SlideRepository,
    responseMapper: ResponseMapper<ISlide>,
  ) {
    this.repository = repository;
    this.responseMapper = responseMapper;
  }

  public async execute(slideId: string): Promise<IResponse<ISlide>> {
    const slide = await this.repository.deleteslide(slideId);

    if (!slide) {
      return this.responseMapper.toResponse(null, messages.deleteFailure('slide'));
    }

    await cdn.destroy(slide?.image?._id);
    return this.responseMapper.toResponse(slide, messages.deleteSuccess('slide'));
  }
}

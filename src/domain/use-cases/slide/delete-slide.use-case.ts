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
    const notice = await this.repository.deleteslide(slideId);

    if (!notice) {
      return this.responseMapper.toResponse(null, messages.deleteFailure('slide'));
    }

    await cdn.destroy(notice?.image?._id);
    return this.responseMapper.toResponse(notice, messages.deleteSuccess('slide'));
  }
}

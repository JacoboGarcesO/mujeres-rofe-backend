import { IResponse } from '../../../core/interfaces/response.interface';
import { ISlide } from '../../../core/interfaces/slide.interface';
import { messages } from '../../../core/utils/messages';
import { ResponseMapper } from '../../mappers/response.mapper';
import { SlideRepository } from '../../repositories/slide.repository';

export class GetSlideByIdUseCase {
  private repository: SlideRepository;
  private responseMapper: ResponseMapper<ISlide>;

  constructor(
    repository: SlideRepository,
    responseMapper: ResponseMapper<ISlide>,
  ) {
    this.repository = repository;
    this.responseMapper = responseMapper;
  }

  public async execute(noticeId: string): Promise<IResponse<ISlide>> {
    const slide = await this.repository.getSlideById(noticeId);

    if (!slide) {
      return this.responseMapper.toResponse(null, messages.getByIdFailure('slide'));
    }

    return this.responseMapper.toResponse(slide, messages.getById('slide'));
  }
}

import { IResponse } from '../../../core/interfaces/response.interface';
import { ISlide } from '../../../core/interfaces/slide.interface';
import { messages } from '../../../core/utils/messages';
import { ResponseMapper } from '../../mappers/response.mapper';
import { SlideRepository } from '../../repositories/slide.repository';

export class GetSlidesUseCase {
  private repository: SlideRepository;
  private responseMapper: ResponseMapper<ISlide[]>;

  constructor(
    repository: SlideRepository,
    responseMapper: ResponseMapper<ISlide[]>,
  ) {
    this.repository = repository;
    this.responseMapper = responseMapper;
  }

  public async execute(): Promise<IResponse<ISlide[]>> {
    const slides = await this.repository.getSlides();

    if (!slides?.length) {
      return this.responseMapper.toResponse(null, messages.getAllFailure('slides'));
    }

    return this.responseMapper.toResponse(slides, messages.getAll('slides'));
  }
}

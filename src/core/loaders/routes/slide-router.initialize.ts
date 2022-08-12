import { Application } from 'express';
import { JwtController } from '../../../api/controllers/jwt.controller';
import { slideController } from '../../../api/controllers/slide.controller';
import { SlideRouter } from '../../../api/routes/slide.routes';
import { slideModel } from '../../../data/models/slide.model';
import { MongooseSource } from '../../../data/mongoose.source';
import { ResponseMapper } from '../../../domain/mappers/response.mapper';
import { SlideMapper } from '../../../domain/mappers/slide.mapper';
import { SlideRepository } from '../../../domain/repositories/slide.repository';
import { CreateSlideUseCase } from '../../../domain/use-cases/slide/create-slide.use-case';
import { DeleteSlideUseCase } from '../../../domain/use-cases/slide/delete-slide.use-case';
import { GetSlideByIdUseCase } from '../../../domain/use-cases/slide/get-slide-by-id.use-case';
import { GetSlidesUseCase } from '../../../domain/use-cases/slide/get-slides.use-case';
import { UpdateSlideUseCase } from '../../../domain/use-cases/slide/update-slide.use-case';


export const SlideRouterInitializer = (app: Application): SlideRouter => {
  const createSlideUseCase = new CreateSlideUseCase(
    new SlideRepository(new MongooseSource(slideModel)),
    new SlideMapper(),
    new ResponseMapper(),
  );

  const getSlidesUseCase = new GetSlidesUseCase(
    new SlideRepository(new MongooseSource(slideModel)),
    new ResponseMapper(),
  );

  const getSlideByIdUseCase = new GetSlideByIdUseCase(
    new SlideRepository(new MongooseSource(slideModel)),
    new ResponseMapper(),
  );

  const updateSlideUseCase = new UpdateSlideUseCase(
    new SlideRepository(new MongooseSource(slideModel)),
    new SlideMapper(),
    new ResponseMapper(),
  );

  const deleteSlideUseCase = new DeleteSlideUseCase(
    new SlideRepository(new MongooseSource(slideModel)),
    new ResponseMapper(),
  );

  const controller = slideController(
    createSlideUseCase,
    updateSlideUseCase,
    deleteSlideUseCase,
    getSlideByIdUseCase,
    getSlidesUseCase,
  );

  const jwtController = new JwtController();

  return new SlideRouter(
    controller,
    jwtController,
    app,
  );
};

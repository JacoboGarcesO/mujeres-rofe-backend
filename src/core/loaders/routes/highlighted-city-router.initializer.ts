import { Application } from 'express';
import { highlightedCityController } from '../../../api/controllers/highlighted-cities.controller';
import { JwtController } from '../../../api/controllers/jwt.controller';
import { HighlightedCityRouter } from '../../../api/routes/highlighted-city.routes';
import { highlightedCityModel } from '../../../data/models/highlighted-city.model';
import { MongooseSource } from '../../../data/mongoose.source';
import { HighlightedCityMapper } from '../../../domain/mappers/highlighted-city.mapper';
import { ResponseMapper } from '../../../domain/mappers/response.mapper';
import { HighlightedCityRepository } from '../../../domain/repositories/highlighted-city.repository';
import { CreateHighlightedCityUseCase } from '../../../domain/use-cases/highlighted-city/create-highlighted-city.use-case';
import { DeleteHighlightedCityUseCase } from '../../../domain/use-cases/highlighted-city/delete-highlighted-city.use-case';
import { GetHighlightedCitiesUseCase } from '../../../domain/use-cases/highlighted-city/get-highlighted-cities.use-case';

export const HighlightedCityRouterInitializer = (app: Application): HighlightedCityRouter => {
  const createHighlightedCityUseCase = new CreateHighlightedCityUseCase(
    new HighlightedCityRepository(new MongooseSource(highlightedCityModel)),
    new ResponseMapper(),
    new HighlightedCityMapper(),
  );

  const deleteHighlightedCityUseCase = new DeleteHighlightedCityUseCase(
    new HighlightedCityRepository(new MongooseSource(highlightedCityModel)),
    new ResponseMapper(),
  );

  const getHighlightedCitiesUseCase = new GetHighlightedCitiesUseCase(
    new HighlightedCityRepository(new MongooseSource(highlightedCityModel)),
    new ResponseMapper(),
  );

  const controller = highlightedCityController(
    createHighlightedCityUseCase,
    getHighlightedCitiesUseCase,
    deleteHighlightedCityUseCase,
  );

  const jwtController = new JwtController();

  return new HighlightedCityRouter(
    controller,
    jwtController,
    app,
  );
};

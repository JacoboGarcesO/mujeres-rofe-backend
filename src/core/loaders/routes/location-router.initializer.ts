import { Application } from 'express';
import { locationController } from '../../../api/controllers/location.controller';
import { LocationRouter } from '../../../api/routes/location.routes';
import { cityModel } from '../../../data/models/city.model';
import { stateModel } from '../../../data/models/state.model';
import { MongooseSource } from '../../../data/mongoose.source';
import { ResponseMapper } from '../../../domain/mappers/response.mapper';
import { CityRepository } from '../../../domain/repositories/city.repository';
import { StateRepository } from '../../../domain/repositories/state.repository';
import { GetCitiesByStateUseCase } from '../../../domain/use-cases/location/get-cities-by-state.use-case';
import { GetCitiesUseCase } from '../../../domain/use-cases/location/get-cities.use-case';
import { GetStatesUseCase } from '../../../domain/use-cases/location/get-states.use-case';

export const LocationRouterInitializer = (app: Application): LocationRouter => {
  const getCitiesByStateUseCase = new GetCitiesByStateUseCase(
    new CityRepository(new MongooseSource(cityModel)),
    new ResponseMapper(),
  );

  const getStatesUseCase = new GetStatesUseCase(
    new StateRepository(new MongooseSource(stateModel)),
    new ResponseMapper(),
  );

  const getCitiesUseCase = new GetCitiesUseCase(
    new CityRepository(new MongooseSource(cityModel)),
    new ResponseMapper(),
  );

  const controller = locationController(
    getCitiesByStateUseCase,
    getCitiesUseCase,
    getStatesUseCase,
  );


  return new LocationRouter(
    controller,
    app,
  );
};

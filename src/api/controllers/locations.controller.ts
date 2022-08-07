import { Request, Response, NextFunction } from 'express';
import { LocationsMapper } from '../../domain/mappers/location.mapper';
import { MessagesMapper } from '../../domain/mappers/messages.mapper';
import { LocationsService } from '../../services/locations.service';

const locationsMapper = new LocationsMapper();
const messageMapper = new MessagesMapper();
const service = new LocationsService(locationsMapper, messageMapper);

export class LocationsController {
  async getStates(_request: Request, response: Response, next: NextFunction) {
    try {
      const statesResponse = await service.getStates();
      return response.status(200).json(statesResponse);
    } catch (err) {
      next(err);
    }
  }

  async getCitiesByState(request: Request, response: Response, next: NextFunction) {
    try {
      const citiesResponse = await service.getCitiesByState(request.params.stateId);
      return response.status(200).json(citiesResponse);
    } catch (err) {
      next(err);
    }
  }

  async getCities(_request: Request, response: Response, next: NextFunction) {
    try {
      const citiesResponse = await service.getCities();
      return response.status(200).json(citiesResponse);
    } catch (err) {
      next(err);
    }
  }
}

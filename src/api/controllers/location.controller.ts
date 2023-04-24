import { NextFunction, Request, Response } from 'express';
import { GetCitiesByStateUseCase } from '../../domain/use-cases/location/get-cities-by-state.use-case';
import { GetCitiesUseCase } from '../../domain/use-cases/location/get-cities.use-case';
import { GetStatesUseCase } from '../../domain/use-cases/location/get-states.use-case';
import { LocationController } from './interfaces/locations-controller.interface';

export const locationController = (
  getCitiesByStateUseCase: GetCitiesByStateUseCase,
  getCitiesUseCase: GetCitiesUseCase,
  getStatesUseCase: GetStatesUseCase,
): LocationController => ({
  handleGetCities: async (_req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await getCitiesUseCase.execute();
      return res.status(200).json(execution);
    } catch (err) {
      next(err);
    }
  },
  handleGetCitiesByState: async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await getCitiesByStateUseCase.execute(req.params.stateId);
      return res.status(200).json(execution);
    } catch (err) {
      next(err);
    }
  },
  handleGetStates: async (_req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await getStatesUseCase.execute();
      return res.status(200).json(execution);
    } catch (err) {
      next(err);
    }
  },
});

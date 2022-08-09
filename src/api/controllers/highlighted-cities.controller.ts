import { NextFunction, Request, Response } from 'express';
import { CreateHighlightedCityUseCase } from '../../domain/use-cases/highlighted-city/create-highlighted-city.use-case';
import { DeleteHighlightedCityUseCase } from '../../domain/use-cases/highlighted-city/delete-highlighted-city.use-case';
import { GetHighlightedCitiesUseCase } from '../../domain/use-cases/highlighted-city/get-highlighted-cities.use-case';
import { HighlightedCityController } from './interfaces/highlighted-city-controller.interface';

export const highlightedCityController = (
  createHighlightedCityUseCase: CreateHighlightedCityUseCase,
  getHighlightedCitiesUseCase: GetHighlightedCitiesUseCase,
  deleteHighlightedCityUseCase: DeleteHighlightedCityUseCase,
): HighlightedCityController => ({
  handleCreateHighlightedCity: async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await createHighlightedCityUseCase.execute(req.body);
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next(err);
    }
  },
  handleGetHighlightedCities: async (_req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await getHighlightedCitiesUseCase.execute();
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next(err);
    }
  },
  handleDeleteHighlightedCity: async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await deleteHighlightedCityUseCase.execute(req.params.highlightedCityId);
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next(err);
    }
  },
});

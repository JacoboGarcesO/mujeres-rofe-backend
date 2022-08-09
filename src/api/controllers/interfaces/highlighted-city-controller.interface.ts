import { NextFunction, Request, Response } from 'express';

export interface HighlightedCityController {
  handleGetHighlightedCities: (_req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
  handleCreateHighlightedCity: (req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
  handleDeleteHighlightedCity: (req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
}

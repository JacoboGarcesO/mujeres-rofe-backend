import { NextFunction, Request, Response } from 'express';

export interface LocationController {
  handleGetCities: (_req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
  handleGetStates: (_req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
  handleGetCitiesByState: (req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
}

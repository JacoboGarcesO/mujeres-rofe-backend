import { NextFunction, Request, Response } from 'express';

export interface RequestController {
  handleCreateRequest: (req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
  handleGetRequests: (_req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
  handleDeleteRequest: (req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
}

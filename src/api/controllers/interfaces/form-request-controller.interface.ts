import { NextFunction, Request, Response } from 'express';

export interface FormRequestController {
  handleCreateFormRequest: (req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
  handleGetFormRequests: (_req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
  handleGetFormRequestById: (req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
  handleUpdateFormRequest: (req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
  handleDeleteFormRequest: (req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
}

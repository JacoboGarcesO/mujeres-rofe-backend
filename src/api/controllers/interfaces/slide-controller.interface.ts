import { NextFunction, Request, Response } from 'express';

export interface SlideController {
  handleCreateSlide: (req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
  handleGetSlides: (_req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
  handleGetSlideById: (req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
  handleUpdateSlide: (req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
  handleDeleteSlide: (req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
}

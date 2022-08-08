import { NextFunction, Request, Response } from 'express';

export interface ChannelController {
  handleCreateChannel: (req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
  handleGetChannels: (_req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
  handleGetChannelById: (req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
  handleUpdateChannel: (req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
  handleDeleteChannel: (req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
}

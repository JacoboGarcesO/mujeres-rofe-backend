import { NextFunction, Request, Response } from 'express';

export interface NoticeController {
  handleCreateNotice: (req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
  handleGetNotices: (_req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
  handleGetNoticeById: (req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
  handleGetNoticesByChannel: (req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
  handleUpdateNotice: (req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
  handleDeleteNotice: (req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
}

import { NextFunction, Request, Response } from 'express';
import { CreateNoticeUseCase } from '../../domain/use-cases/notice/create-notice.use-case';
import { DeleteNoticeUseCase } from '../../domain/use-cases/notice/delete-notice.use-case';
import { GetNoticeByIdUseCase } from '../../domain/use-cases/notice/get-notice-by-id.use-case';
import { GetNoticesByChannelUseCase } from '../../domain/use-cases/notice/get-notices-by-channel.use-case';
import { GetNoticesUseCase } from '../../domain/use-cases/notice/get-notices.use-case';
import { UpdateNoticeUseCase } from '../../domain/use-cases/notice/update-notice.use-case';
import { NoticeController } from './interfaces/notice-controller.interface';

export const noticeController = (
  createNoticeUseCase: CreateNoticeUseCase,
  updateNoticeUseCase: UpdateNoticeUseCase,
  deleteNoticeUseCase: DeleteNoticeUseCase,
  getNoticeByIdUseCase: GetNoticeByIdUseCase,
  getNoticesUseCase: GetNoticesUseCase,
  getNoticesByChannelUseCase: GetNoticesByChannelUseCase,
): NoticeController => ({
  handleCreateNotice: async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await createNoticeUseCase.execute(req.body, req.files);
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next(err);
    }
  },
  handleDeleteNotice: async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await deleteNoticeUseCase.execute(req.params.noticeId);
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next(err);
    }
  },
  handleGetNoticesByChannel: async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await getNoticesByChannelUseCase.execute(req.params.channel);
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next(err);
    }
  },
  handleGetNoticeById: async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await getNoticeByIdUseCase.execute(req.params.noticeId);
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next(err);
    }
  },
  handleGetNotices: async (_req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await getNoticesUseCase.execute();
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next(err);
    }
  },
  handleUpdateNotice: async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await updateNoticeUseCase.execute(req.body, req.files);
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next(err);
    }
  },
});

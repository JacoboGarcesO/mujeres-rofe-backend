import { NextFunction, Request, Response } from 'express';
import { MessagesMapper } from '../../mappers/messages.mapper';
import { NoticeMapper } from '../../mappers/notices.mapper';
import { NoticesService } from '../../services/notices.service';

const noticeMapper = new NoticeMapper();
const messageMapper = new MessagesMapper();
const service = new NoticesService(noticeMapper, messageMapper);
export class NoticeController {

  async getAll(_request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const noticesResponse = await service.getAll();
      return response.status(200).json(noticesResponse);
    } catch (err) {
      next(err);
    }
  }

  async getById(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const noticeResponse = await service.getById(request.params.noticeId);
      return response.status(200).json(noticeResponse);
    } catch (err) {
      next(err);
    }
  }

  async create(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const noticeCreated = await service.create(request.body, request.file?.path);
      return response.status(200).json(noticeCreated);
    } catch (err) {
      next(err);
    }
  }

  async update(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {      
      const noticeResponse = await service.update(request.body, request.file?.path);
      return response.status(200).json(noticeResponse);
    } catch (err) {
      next(err);
    }
  }
}

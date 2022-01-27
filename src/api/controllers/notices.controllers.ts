import { NextFunction, Request, Response } from 'express';
import { NoticeMapper } from '../../mappers/notices.mapper';
import { NoticesService } from '../../services/notices.service';

const noticeMapper = new NoticeMapper();
const service = new NoticesService(noticeMapper);
export class NoticeController {

  async create(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const noticeCreated = await service.create(request.body);
      return response.status(200).json(noticeCreated);
    } catch (err) {
      next(err);
    }
  }
}

import { Application } from 'express';
import { JwtController } from '../../../api/controllers/jwt.controller';
import { noticeController } from '../../../api/controllers/notices.controllers';
import { NoticeRouter } from '../../../api/routes/notice.routes';
import { noticeModel } from '../../../data/models/notice.model';
import { MongooseSource } from '../../../data/mongoose.source';
import { NoticeMapper } from '../../../domain/mappers/notice.mapper';
import { ResponseMapper } from '../../../domain/mappers/response.mapper';
import { NoticeRepository } from '../../../domain/repositories/notice.repository';
import { CreateNoticeUseCase } from '../../../domain/use-cases/notice/create-notice.use-case';
import { DeleteNoticeUseCase } from '../../../domain/use-cases/notice/delete-notice.use-case';
import { GetNoticeByIdUseCase } from '../../../domain/use-cases/notice/get-notice-by-id.use-case';
import { GetNoticesByChannelUseCase } from '../../../domain/use-cases/notice/get-notices-by-channel.use-case';
import { GetNoticesUseCase } from '../../../domain/use-cases/notice/get-notices.use-case';
import { UpdateNoticeUseCase } from '../../../domain/use-cases/notice/update-notice.use-case';

export const NoticeRouterInitializer = (app: Application): NoticeRouter => {
  const createNoticeUseCase = new CreateNoticeUseCase(
    new NoticeRepository(new MongooseSource(noticeModel)),
    new NoticeMapper(),
    new ResponseMapper(),
  );

  const getNoticesUseCase = new GetNoticesUseCase(
    new NoticeRepository(new MongooseSource(noticeModel)),
    new ResponseMapper(),
  );

  const getNoticeByIdUseCase = new GetNoticeByIdUseCase(
    new NoticeRepository(new MongooseSource(noticeModel)),
    new ResponseMapper(),
  );

  const getNoticesByChannelUseCase = new GetNoticesByChannelUseCase(
    new NoticeRepository(new MongooseSource(noticeModel)),
    new ResponseMapper(),
  );

  const updateNoticeUseCase = new UpdateNoticeUseCase(
    new NoticeRepository(new MongooseSource(noticeModel)),
    new NoticeMapper(),
    new ResponseMapper(),
  );

  const deleteNoticeUseCase = new DeleteNoticeUseCase(
    new NoticeRepository(new MongooseSource(noticeModel)),
    new ResponseMapper(),
  );

  const controller = noticeController(
    createNoticeUseCase,
    updateNoticeUseCase,
    deleteNoticeUseCase,
    getNoticeByIdUseCase,
    getNoticesUseCase,
    getNoticesByChannelUseCase,
  );

  const jwtController = new JwtController();

  return new NoticeRouter(
    controller,
    jwtController,
    app,
  );
};

import { Application, Router } from 'express';
import { storage } from '../../core/config/storage';
import { NoticeController } from '../controllers/interfaces/notice-controller.interface';
import { JwtController } from '../controllers/jwt.controller';
import { errorMiddleware } from '../../core/middlewares/error.middleware';

export class NoticeRouter {
  private app: Application;
  private controller: NoticeController;
  private jwtController: JwtController;

  constructor(
    controller: NoticeController,
    jwtController: JwtController,
    app: Application,
  ) {
    this.controller = controller;
    this.jwtController = jwtController;
    this.app = app;
  }

  init() {
    const router = Router();
    this.app.use('/api/notices', router);
    this.app.use(errorMiddleware);

    router.post(
      '/',
      this.jwtController.validateToken,
      storage.fields([{ name: 'content' }, { name: 'icon' }]),
      this.controller.handleCreateNotice,
    );

    router.get(
      '/',
      this.jwtController.validateToken,
      this.controller.handleGetNotices,
    );

    router.get(
      '/:noticeId',
      this.jwtController.validateToken,
      this.controller.handleGetNoticeById,
    );

    router.get(
      '/channel/:channel',
      this.jwtController.validateToken,
      this.controller.handleGetNoticesByChannel,
    );

    router.put(
      '/',
      this.jwtController.validateToken,
      storage.fields([{ name: 'content' }, { name: 'icon' }]),
      this.controller.handleUpdateNotice,
    );

    router.delete(
      '/:noticeId',
      this.jwtController.validateToken,
      this.controller.handleDeleteNotice,
    );
  }
}

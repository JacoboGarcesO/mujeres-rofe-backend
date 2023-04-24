import { Application, Router } from 'express';
import { storage } from '../../core/config/storage';
import { RequestController } from '../controllers/interfaces/request-controller.interface';
import { JwtController } from '../controllers/jwt.controller';
import { errorMiddleware } from '../../core/middlewares/error.middleware';

export class RequestRouter {
  private app: Application;
  private controller: RequestController;
  private jwtController: JwtController;

  constructor(
    controller: RequestController,
    jwtController: JwtController,
    app: Application,
  ) {
    this.app = app;
    this.controller = controller;
    this.jwtController = jwtController;
  }

  init() {
    const router = Router();
    this.app.use('/api/requests', router);
    this.app.use(errorMiddleware);

    router.post(
      '/',
      this.jwtController.validateToken,
      storage.single('image'),
      this.controller.handleCreateRequest,
    );

    router.get(
      '/',
      this.jwtController.validateToken,
      this.controller.handleGetRequests,
    );

    router.delete(
      '/:requestId',
      this.jwtController.validateToken,
      this.controller.handleDeleteRequest,
    );
  }
}

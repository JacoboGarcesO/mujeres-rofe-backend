import { Application, Router } from 'express';
import { storage } from '../../core/config/storage';
import { JwtController } from '../controllers/jwt.controller';
import { RequestsController } from '../controllers/requests.controllers';

export class RequestRouter {
  private app: Application;
  private controller: RequestsController = new RequestsController();
  private jwtController: JwtController = new JwtController();

  constructor(app: Application) { this.app = app; }

  init() {
    const router = Router();
    this.app.use('/api/requests', router);

    router.post(
      '/',
      this.jwtController.validateToken,
      storage.fields([{ name: 'image' }]),
      this.controller.create,
    );

    router.get(
      '/',
      this.jwtController.validateToken,
      this.controller.getAll,
    );

    router.get(
      '/:requestId',
      this.jwtController.validateToken,
      this.controller.getById,
    );

    router.put(
      '/',
      this.jwtController.validateToken,
      this.controller.update,
    );

    router.delete(
      '/:requestId',
      this.jwtController.validateToken,
      this.controller.delete,
    );
  }
}

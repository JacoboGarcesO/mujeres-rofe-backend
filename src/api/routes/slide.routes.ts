import { Application, Router } from 'express';
import { storage } from '../../core/config/storage';
import { JwtController } from '../controllers/jwt.controller';
import { SlideController } from '../controllers/slides.controllers';

export class SlideRouter {
  private app: Application;
  private controller: SlideController = new SlideController();
  private jwtController: JwtController = new JwtController();

  constructor(app: Application) { this.app = app; }

  init() {
    const router = Router();
    this.app.use('/api/slides', router);

    router.post(
      '/',
      this.jwtController.validateToken,
      storage.single('image'),
      this.controller.create,
    );

    router.get(
      '/',
      this.jwtController.validateToken,
      this.controller.getAll,
    );

    router.get(
      '/:slideId',
      this.jwtController.validateToken,
      this.controller.getById,
    );

    router.put(
      '/',
      this.jwtController.validateToken,
      storage.single('image'),
      this.controller.update,
    );

    router.delete(
      '/:slideId',
      this.jwtController.validateToken,
      this.controller.delete,
    );
  }
}

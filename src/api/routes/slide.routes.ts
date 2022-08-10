import { Application, Router } from 'express';
import { storage } from '../../core/config/storage';
import { SlideController } from '../controllers/interfaces/slide-controller.interface';
import { JwtController } from '../controllers/jwt.controller';

export class SlideRouter {
  private app: Application;
  private controller: SlideController;
  private jwtController: JwtController;

  constructor(
    controller: SlideController,
    jwtController: JwtController,
    app: Application,
  ) {
    this.app = app;
    this.controller = controller;
    this.jwtController = jwtController;
  }

  init() {
    const router = Router();
    this.app.use('/api/slides', router);

    router.post(
      '/',
      this.jwtController.validateToken,
      storage.single('image'),
      this.controller.handleCreateSlide,
    );

    router.get(
      '/',
      this.jwtController.validateToken,
      this.controller.handleGetSlides,
    );

    router.get(
      '/:slideId',
      this.jwtController.validateToken,
      this.controller.handleGetSlideById,
    );

    router.put(
      '/',
      this.jwtController.validateToken,
      storage.single('image'),
      this.controller.handleUpdateSlide,
    );

    router.delete(
      '/:slideId',
      this.jwtController.validateToken,
      this.controller.handleDeleteSlide,
    );
  }
}

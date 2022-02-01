import { Application, Router } from 'express';
import { JwtController } from '../controllers/jwt.controller';
import { SlideController } from '../controllers/slides.controllers';

export class SlidesRouter {
  private app: Application;
  private controller: SlideController = new SlideController();
  private jwtController: JwtController = new JwtController();

  constructor(app: Application) { this.app = app; }

  init() {
    const router = Router();
    this.app.use('/api/slides', router);
    router.post('/', this.jwtController.validateToken, this.controller.create);
    router.get('/', this.jwtController.validateToken, this.controller.getAll);
    router.get('/:slideId', this.jwtController.validateToken, this.controller.getById);
  }
}

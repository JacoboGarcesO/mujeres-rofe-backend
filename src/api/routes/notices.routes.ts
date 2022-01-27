import { Application, Router } from 'express';
import { JwtController } from '../controllers/jwt.controller';
import { NoticeController } from '../controllers/notices.controllers';

export class NoticesRouter {
  private app: Application;
  private controller: NoticeController = new NoticeController();
  private jwtController: JwtController = new JwtController();

  constructor(app: Application) { this.app = app; }

  init() {
    const router = Router();
    this.app.use('/api/notices', router);
    router.post('/', this.jwtController.validateToken, this.controller.create);
  }
}

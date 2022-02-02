import { Application, Router } from 'express';
import storage from '../../config/storage';
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
    router.post('/', this.jwtController.validateToken, storage.fields([{ name: 'content' }, { name: 'icon' }]), this.controller.create);
    router.get('/', this.jwtController.validateToken, this.controller.getAll);
    router.get('/:noticeId', this.jwtController.validateToken, this.controller.getById);
    router.put('/', this.jwtController.validateToken, storage.fields([{ name: 'content' }, { name: 'icon' }]), this.controller.update);
    router.delete('/:noticeId', this.jwtController.validateToken, this.controller.delete);
  }
}

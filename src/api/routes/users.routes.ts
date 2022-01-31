import { Application, Router } from 'express';
import storage from '../../config/storage';
import { JwtController } from '../controllers/jwt.controller';
import { UserController } from '../controllers/users.controllers';
export class UsersRouter {
  private app: Application;
  private controller: UserController = new UserController();
  private jwtController: JwtController = new JwtController();

  constructor(app: Application) { this.app = app; }

  init() {
    const router = Router();
    this.app.use('/api/users', router);

    router.post('/', this.jwtController.validateToken, storage.single('image'), this.controller.create);
    router.get('/', this.jwtController.validateToken, this.controller.getAll);
    router.post('/auth', this.controller.auth);
  }
}

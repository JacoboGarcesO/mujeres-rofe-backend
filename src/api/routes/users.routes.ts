import { Application, Router } from 'express';
import { UserController } from '../controllers/users.controllers';

export class UsersRouter {
  private app: Application;
  private controller: UserController = new UserController();

  constructor(app: Application) { this.app = app; }

  init() {
    const router = Router();
    this.app.use('/api/users', router);
    router.post('/', this.controller.create);
  }
}

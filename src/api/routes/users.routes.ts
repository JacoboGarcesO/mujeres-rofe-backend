import { Application, Router } from 'express';
import storage from '../../config/storage';
import { JwtController } from '../controllers/jwt.controller';
import { UserController } from '../controllers/users.controllers';
export class UsersRouter {
  private app: Application;
  private controller: UserController = new UserController();
  private jwtController: JwtController = new JwtController();

  constructor(app: Application) {
    this.app = app;
  }

  init() {
    const router = Router();
    this.app.use('/api/users', router);

    router.post('/', storage.fields([{ name: 'image' }, { name: 'documentImage' }]),
      this.controller.create);
    router.get('/', this.jwtController.validateToken, this.controller.getAll);
    router.get(
      '/paginated/:from',
      this.jwtController.validateToken,
      this.controller.getPaginatedUsers,
    );
    router.put(
      '/',
      this.jwtController.validateToken,
      storage.fields([{ name: 'image' }, { name: 'documentImage' }]),
      this.controller.update,
    );
    router.get(
      '/:userId',
      this.jwtController.validateToken,
      this.controller.getById,
    );
    router.delete(
      '/:userId',
      this.jwtController.validateToken,
      this.controller.delete,
    );
    router.post('/auth', this.controller.auth);
    router.post('/forgot-password', this.controller.forgotPassword);
  }
}

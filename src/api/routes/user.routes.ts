import { Application, Router } from 'express';
import { storage } from '../../core/config/storage';
import { UserController } from '../controllers/interfaces/user-controller.interface';
import { JwtController } from '../controllers/jwt.controller';
import { errorMiddleware } from '../../core/middlewares/error.middleware';

export class UserRouter {
  private app: Application;
  private controller: UserController;
  private jwtController: JwtController;

  constructor(
    controller: UserController,
    jwtController: JwtController,
    app: Application,
  ) {
    this.controller = controller;
    this.jwtController = jwtController;
    this.app = app;
  }

  init() {
    const router = Router();
    this.app.use('/api/users', router);
    this.app.use(errorMiddleware);
    router.post(
      '/',
      storage.fields([{ name: 'image' }, { name: 'documentImage' }]),
      this.controller.handleCreateUser,
    );

    router.post(
      '/auth',
      this.controller.handleAuthentication,
    );

    router.post(
      '/forgot-password',
      this.controller.handleForgotPassword,
    );

    router.put(
      '/',
      this.jwtController.validateToken,
      storage.fields([{ name: 'image' }, { name: 'documentImage' }]),
      this.controller.handleUpdateUser,
    );


    router.delete(
      '/:userId',
      this.jwtController.validateToken,
      this.controller.handleDeleteUser,
    );

    router.post(
      '/paginated',
      this.jwtController.validateToken,
      this.controller.handleGetUsers,
    );

    router.get(
      '/:userId',
      this.jwtController.validateToken,
      this.controller.handleGetUserById,
    );
  }
}

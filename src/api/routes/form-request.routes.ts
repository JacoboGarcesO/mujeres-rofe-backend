import { Application, Router } from 'express';
import { JwtController } from '../controllers/jwt.controller';
import { FormRequestsController } from '../controllers/form-requests.controllers';

export class FormRequestRouter {
  private app: Application;
  private controller: FormRequestsController = new FormRequestsController();
  private jwtController: JwtController = new JwtController();

  constructor(app: Application) { this.app = app; }

  init() {
    const router = Router();
    this.app.use('/api/form', router);

    router.post(
      '/',
      this.jwtController.validateToken,
      this.controller.create,
    );

    router.get(
      '/',
      this.jwtController.validateToken,
      this.controller.getAll,
    );

    router.get(
      '/:formId',
      this.jwtController.validateToken,
      this.controller.getById,
    );

    router.put(
      '/',
      this.jwtController.validateToken,
      this.controller.update,
    );

    router.delete(
      '/:formId',
      this.jwtController.validateToken,
      this.controller.delete,
    );
  }
}

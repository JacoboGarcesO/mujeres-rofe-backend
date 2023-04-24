import { Application, Router } from 'express';
import { FormRequestController } from '../controllers/interfaces/form-request-controller.interface';
import { JwtController } from '../controllers/jwt.controller';
import { errorMiddleware } from '../../core/middlewares/error.middleware';

export class FormRequestRouter {
  private app: Application;
  private formRequestcontroller: FormRequestController;
  private jwtController: JwtController;

  constructor(
    formRequestcontroller: FormRequestController,
    jwtController: JwtController,
    app: Application,
  ) {
    this.formRequestcontroller = formRequestcontroller;
    this.jwtController = jwtController;
    this.app = app;
  }

  init() {
    const router = Router();
    this.app.use('/api/form', router);
    this.app.use(errorMiddleware);

    router.post(
      '/',
      this.jwtController.validateToken,
      this.formRequestcontroller.handleCreateFormRequest,
    );

    router.get(
      '/',
      this.jwtController.validateToken,
      this.formRequestcontroller.handleGetFormRequests,
    );

    router.get(
      '/:formRequestId',
      this.jwtController.validateToken,
      this.formRequestcontroller.handleGetFormRequestById,
    );

    router.put(
      '/',
      this.jwtController.validateToken,
      this.formRequestcontroller.handleUpdateFormRequest,
    );

    router.delete(
      '/:formRequestId',
      this.jwtController.validateToken,
      this.formRequestcontroller.handleDeleteFormRequest,
    );
  }
}

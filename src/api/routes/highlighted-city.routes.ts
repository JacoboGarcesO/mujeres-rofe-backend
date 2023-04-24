import { Application, Router } from 'express';
import { HighlightedCityController } from '../controllers/interfaces/highlighted-city-controller.interface';
import { JwtController } from '../controllers/jwt.controller';
import { errorMiddleware } from '../../core/middlewares/error.middleware';

export class HighlightedCityRouter {
  private app: Application;
  private controller: HighlightedCityController;
  private jwtController: JwtController;

  constructor(
    controller: HighlightedCityController,
    jwtController: JwtController,
    app: Application,
  ) {
    this.app = app;
    this.controller = controller;
    this.jwtController = jwtController;
  }

  init() {
    const router = Router();
    this.app.use('/api/highlighted', router);
    this.app.use(errorMiddleware);

    router.post(
      '/',
      this.jwtController.validateToken,
      this.controller.handleCreateHighlightedCity,
    );

    router.get(
      '/',
      this.jwtController.validateToken,
      this.controller.handleGetHighlightedCities,
    );

    router.delete(
      '/:highlightedCityId',
      this.jwtController.validateToken,
      this.controller.handleDeleteHighlightedCity,
    );
  }
}

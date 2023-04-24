import { Application, Router } from 'express';
import { LocationController } from '../controllers/interfaces/locations-controller.interface';
import { errorMiddleware } from '../../core/middlewares/error.middleware';

export class LocationRouter {
  private app: Application;
  private locationController: LocationController;

  constructor(locationController: LocationController, app: Application) {
    this.locationController = locationController;
    this.app = app;
  }

  init() {
    const router = Router();
    this.app.use('/api/locations', router);
    this.app.use(errorMiddleware);

    router.get(
      '/',
      this.locationController.handleGetStates,
    );

    router.get(
      '/:stateId',
      this.locationController.handleGetCitiesByState,
    );

    router.post(
      '/cities',
      this.locationController.handleGetCities,
    );
  }
}

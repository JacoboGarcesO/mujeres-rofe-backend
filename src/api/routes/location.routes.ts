import { Application, Router } from 'express';
import { LocationsController } from '../controllers/locations.controller';

export class LocationRouter {
  private app: Application;
  private controller: LocationsController = new LocationsController();

  constructor(app: Application) { this.app = app; }

  init() {
    const router = Router();
    this.app.use('/api/locations', router);

    router.get(
      '/',
      this.controller.getStates,
    );

    router.get(
      '/:stateId',
      this.controller.getCitiesByState,
    );

    router.post(
      '/cities',
      this.controller.getCities,
    );
  }
}

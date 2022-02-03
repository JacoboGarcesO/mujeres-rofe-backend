import { Application, Router } from 'express';
import { JwtController } from '../controllers/jwt.controller';
import { LocationsController } from '../controllers/locations.controller';

export class LocationsRouter {
  private app: Application;
  private controller: LocationsController = new LocationsController();
  private jwtController: JwtController = new JwtController();

  constructor(app: Application) { this.app = app; }

  init() {
    const router = Router();
    this.app.use('/api/locations', router);
    router.get('/', this.jwtController.validateToken ,this.controller.getStates);
    router.get('/:stateId', this.jwtController.validateToken ,this.controller.getCitiesByState);
  }
}

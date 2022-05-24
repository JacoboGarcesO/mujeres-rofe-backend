import { Application, Router } from 'express';
import { HighlightedCityController } from '../controllers/highlighted-cities.controller';
import { JwtController } from '../controllers/jwt.controller';

export class HighlightedCityRouter {
  private app: Application;
  private controller: HighlightedCityController = new HighlightedCityController();
  private jwtController: JwtController = new JwtController();
  
  constructor(app: Application) { this.app = app; }
  
  init() {
    const router = Router();
    this.app.use('/api/highlighted', router);
    router.post('/', this.jwtController.validateToken, this.controller.create);
    router.get('/', this.jwtController.validateToken, this.controller.getAll);
    router.delete('/:cityId', this.jwtController.validateToken, this.controller.delete);
  }
}

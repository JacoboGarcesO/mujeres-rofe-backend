import { Application, Router } from 'express';
import { ChannelController } from '../controllers/channels.controllers';
import { JwtController } from '../controllers/jwt.controller';

export class ChannelsRouter {
  private app: Application;
  private controller: ChannelController = new ChannelController();
  private jwtController: JwtController = new JwtController();

  constructor(app: Application) { this.app = app; }

  init() {
    const router = Router();
    this.app.use('/api/channels', router);
    router.post('/', this.jwtController.validateToken, this.controller.create);
  }
}

import { Application, Router } from 'express';
import { ChannelController } from '../controllers/channels.controllers';

export class ChannelsRouter {
  private app: Application;
  private controller: ChannelController = new ChannelController();

  constructor(app: Application) { this.app = app; }

  init() {
    const router = Router();
    this.app.use('/api/channels', router);
    router.post('/', this.controller.create);
  }
}

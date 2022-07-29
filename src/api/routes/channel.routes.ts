import { Application, Router } from 'express';
import storage from '../../config/storage';
import { ChannelController } from '../controllers/channels.controllers';
import { JwtController } from '../controllers/jwt.controller';

export class ChannelRouter {
  private app: Application;
  private controller: ChannelController = new ChannelController();
  private jwtController: JwtController = new JwtController();

  constructor(app: Application) { this.app = app; }

  init() {
    const router = Router();
    this.app.use('/api/channels', router);

    router.post(
      '/',
      this.jwtController.validateToken,
      storage.fields([{ name: 'banner' }, { name: 'icon' }]),
      this.controller.create,
    );

    router.get(
      '/',
      this.jwtController.validateToken,
      this.controller.getAll,
    );

    router.get(
      '/:channelId',
      this.jwtController.validateToken,
      this.controller.getById,
    );

    router.put(
      '/',
      this.jwtController.validateToken,
      storage.fields([{ name: 'banner' }, { name: 'icon' }]),
      this.controller.update,
    );

    router.delete(
      '/:channelId',
      this.jwtController.validateToken,
      this.controller.delete,
    );
  }
}

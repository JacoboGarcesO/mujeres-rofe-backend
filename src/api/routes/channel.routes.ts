import { Application, Router } from 'express';
import storage from '../../core/config/storage';
import { ChannelController } from '../controllers/channels.controllers';
import { JwtController } from '../controllers/jwt.controller';

export class ChannelRouter {
  private app: Application;
  private channelController: ChannelController;
  private jwtController: JwtController;

  constructor(
    channelController: ChannelController,
    jwtController: JwtController,
    app: Application,
  ) {
    this.channelController = channelController;
    this.jwtController = jwtController;
    this.app = app;
  }

  init() {
    const router = Router();
    this.app.use('/api/channels', router);

    router.post(
      '/',
      this.jwtController.validateToken,
      storage.fields([{ name: 'banner' }, { name: 'icon' }]),
      this.channelController.handleCreateChannel.bind(this),
    );

    router.get(
      '/',
      this.jwtController.validateToken,
      this.channelController.handleGetChannels.bind(this),
    );

    router.get(
      '/:channelId',
      this.jwtController.validateToken,
      this.channelController.handleGetChannelById.bind(this),
    );

    router.put(
      '/',
      this.jwtController.validateToken,
      storage.fields([{ name: 'banner' }, { name: 'icon' }]),
      this.channelController.handleUpdateChannel.bind(this),
    );

    router.delete(
      '/:channelId',
      this.jwtController.validateToken,
      this.channelController.handleDeleteChannel.bind(this),
    );
  }
}

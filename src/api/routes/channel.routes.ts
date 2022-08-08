import { Application, Router } from 'express';
import { storage } from '../../core/config/storage';
import { ChannelController } from '../controllers/interfaces/channel-controller.interface';
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
      this.channelController.handleCreateChannel,
    );

    router.get(
      '/',
      this.jwtController.validateToken,
      this.channelController.handleGetChannels,
    );

    router.get(
      '/:channelId',
      this.jwtController.validateToken,
      this.channelController.handleGetChannelById,
    );

    router.put(
      '/',
      this.jwtController.validateToken,
      storage.fields([{ name: 'banner' }, { name: 'icon' }]),
      this.channelController.handleUpdateChannel,
    );

    router.delete(
      '/:channelId',
      this.jwtController.validateToken,
      this.channelController.handleDeleteChannel,
    );
  }
}

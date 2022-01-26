import { Application } from 'express';
import { ChannelsRouter } from '../api/routes/channels.routes';
import { UsersRouter } from '../api/routes/users.routes';

export default async (app: Application): Promise<Application> => {
  const userRouter = new UsersRouter(app);
  userRouter.init();

  const channelRouter = new ChannelsRouter(app);
  channelRouter.init();

  return app;
};

import { Application } from 'express';
import { UsersRouter } from '../api/routes/users.routes';

export default async (app: Application): Promise<Application> => {
  const userRouter = new UsersRouter(app);
  userRouter.init();

  return app;
};

import { Application } from 'express';
import { ChannelsRouter } from '../api/routes/channels.routes';
import { LocationsRouter } from '../api/routes/locations.routes';
import { NoticesRouter } from '../api/routes/notices.routes';
import { SlidesRouter } from '../api/routes/slides.routes';
import { UsersRouter } from '../api/routes/users.routes';
import { FormRequestsRouter } from '../api/routes/form-requests.routes';
import { RequestsRouter } from '../api/routes/requests.routes';
import { HighlightedCityRouter } from '../api/routes/highlighted-cities.routes';

export default async (app: Application): Promise<Application> => {
  const routes = [
    new HighlightedCityRouter(app),
    new RequestsRouter(app),
    new FormRequestsRouter(app),
    new LocationsRouter(app),
    new SlidesRouter(app),
    new NoticesRouter(app),
    new ChannelsRouter(app),
    new UsersRouter(app),
  ];

  routes.forEach((route) => route.init());

  return app;
};

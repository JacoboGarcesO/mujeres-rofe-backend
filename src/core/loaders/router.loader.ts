import { Application } from 'express';
import { ChannelRouter } from '../../api/routes/channel.routes';
import { FormRequestRouter } from '../../api/routes/form-request.routes';
import { HighlightedCityRouter } from '../../api/routes/highlighted-city.routes';
import { LocationRouter } from '../../api/routes/location.routes';
import { NoticeRouter } from '../../api/routes/notice.routes';
import { RequestRouter } from '../../api/routes/request.routes';
import { SlideRouter } from '../../api/routes/slide.routes';
import { UserRouter } from '../../api/routes/user.routes';
import { ChannelRouterInitializer } from './routes/channel-router.initialize';
import { FormRequestRouterInitializer } from './routes/form-request-router.initializer';
import { LocationRouterInitializer } from './routes/location-router.initializer';

export default class Router {
  private routes: (
    HighlightedCityRouter
    | RequestRouter
    | FormRequestRouter
    | LocationRouter
    | SlideRouter
    | NoticeRouter
    | ChannelRouter
    | UserRouter
  )[];

  constructor(app: Application) {
    this.routes = [
      new HighlightedCityRouter(app),
      new RequestRouter(app),
      new SlideRouter(app),
      new NoticeRouter(app),
      new UserRouter(app),
      FormRequestRouterInitializer(app),
      LocationRouterInitializer(app),
      ChannelRouterInitializer(app),
    ];
  }

  public init(): void {
    this.routes.forEach((route) => route.init());
  }
}

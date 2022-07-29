import { Application } from 'express';
import { ChannelRouter } from '../api/routes/channel.routes';
import { LocationRouter } from '../api/routes/location.routes';
import { NoticeRouter } from '../api/routes/notice.routes';
import { SlideRouter } from '../api/routes/slide.routes';
import { UserRouter } from '../api/routes/user.routes';
import { FormRequestRouter } from '../api/routes/form-request.routes';
import { RequestRouter } from '../api/routes/request.routes';
import { HighlightedCityRouter } from '../api/routes/highlighted-city.routes';

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
      new FormRequestRouter(app),
      new LocationRouter(app),
      new SlideRouter(app),
      new NoticeRouter(app),
      new ChannelRouter(app),
      new UserRouter(app),
    ];
  }

  public init(): void {
    this.routes.forEach((route) => route.init());
  }
}

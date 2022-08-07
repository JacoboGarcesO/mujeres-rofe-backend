import { Application } from 'express';
import { ChannelRouter } from '../../api/routes/channel.routes';
import { LocationRouter } from '../../api/routes/location.routes';
import { NoticeRouter } from '../../api/routes/notice.routes';
import { SlideRouter } from '../../api/routes/slide.routes';
import { UserRouter } from '../../api/routes/user.routes';
import { FormRequestRouter } from '../../api/routes/form-request.routes';
import { RequestRouter } from '../../api/routes/request.routes';
import { HighlightedCityRouter } from '../../api/routes/highlighted-city.routes';
import { ChannelController } from '../../api/controllers/channels.controllers';
import { JwtController } from '../../api/controllers/jwt.controller';
import { CreateChannelUseCase } from '../../domain/use-cases/channel/create-channel.use-case';
import { ChannelRepository } from '../../domain/repositories/channel.repository';
import { MongooseSource } from '../../data/mongoose.source';
import { channelModel } from '../../data/models/channel.model';
import { ChannelMapper } from '../../domain/mappers/channel.mapper';
import { ResponseMapper } from '../../domain/mappers/response.mapper';
import { GetChannelsUseCase } from '../../domain/use-cases/channel/get-channels.use-case';
import { GetChannelByIdUseCase } from '../../domain/use-cases/channel/get-channel-by-id.use-case';
import { UpdateChannelUseCase } from '../../domain/use-cases/channel/update-channel.use-case';
import { DeleteChannelUseCase } from '../../domain/use-cases/channel/delete-channel.use-case';

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
      new UserRouter(app),
      this.initializeChannelRouter(app),
    ];
  }

  public init(): void {
    this.routes.forEach((route) => route.init());
  }

  private initializeChannelRouter(app: Application): ChannelRouter {
    const createChannelUseCase = new CreateChannelUseCase(
      new ChannelRepository(new MongooseSource(channelModel)),
      new ChannelMapper(),
      new ResponseMapper(),
    );

    const getChannelsUseCase = new GetChannelsUseCase(
      new ChannelRepository(new MongooseSource(channelModel)),
      new ResponseMapper(),
    );

    const getChannelByIdUseCase = new GetChannelByIdUseCase(
      new ChannelRepository(new MongooseSource(channelModel)),
      new ResponseMapper(),
    );

    const updateChannelUseCase = new UpdateChannelUseCase(
      new ChannelRepository(new MongooseSource(channelModel)),
      new ChannelMapper(),
      new ResponseMapper(),
    );

    const deleteChannelUseCase = new DeleteChannelUseCase(
      new ChannelRepository(new MongooseSource(channelModel)),
      new ResponseMapper(),
    );

    const channelController = new ChannelController(
      createChannelUseCase,
      getChannelsUseCase,
      getChannelByIdUseCase,
      updateChannelUseCase,
      deleteChannelUseCase,
    );

    const jwtController = new JwtController();

    return new ChannelRouter(
      channelController,
      jwtController,
      app,
    );
  }
}

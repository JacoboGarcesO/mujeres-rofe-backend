import { Application } from 'express';
import { channelController } from '../../api/controllers/channel.controllers';
import { formRequestController } from '../../api/controllers/form-requestcontrollers';
import { JwtController } from '../../api/controllers/jwt.controller';
import { locationController } from '../../api/controllers/location.controller';
import { ChannelRouter } from '../../api/routes/channel.routes';
import { FormRequestRouter } from '../../api/routes/form-request.routes';
import { HighlightedCityRouter } from '../../api/routes/highlighted-city.routes';
import { LocationRouter } from '../../api/routes/location.routes';
import { NoticeRouter } from '../../api/routes/notice.routes';
import { RequestRouter } from '../../api/routes/request.routes';
import { SlideRouter } from '../../api/routes/slide.routes';
import { UserRouter } from '../../api/routes/user.routes';
import { channelModel } from '../../data/models/channel.model';
import { cityModel } from '../../data/models/city.model';
import { formRequestModel } from '../../data/models/form-request.model';
import { stateModel } from '../../data/models/state.model';
import { MongooseSource } from '../../data/mongoose.source';
import { ChannelMapper } from '../../domain/mappers/channel.mapper';
import { FormRequestMapper } from '../../domain/mappers/form-request.mapper';
import { ResponseMapper } from '../../domain/mappers/response.mapper';
import { ChannelRepository } from '../../domain/repositories/channel.repository';
import { CityRepository } from '../../domain/repositories/city.repository';
import { FormRequestRepository } from '../../domain/repositories/form-request.repository';
import { StateRepository } from '../../domain/repositories/state.repository';
import { CreateChannelUseCase } from '../../domain/use-cases/channel/create-channel.use-case';
import { DeleteChannelUseCase } from '../../domain/use-cases/channel/delete-channel.use-case';
import { GetChannelByIdUseCase } from '../../domain/use-cases/channel/get-channel-by-id.use-case';
import { GetChannelsUseCase } from '../../domain/use-cases/channel/get-channels.use-case';
import { UpdateChannelUseCase } from '../../domain/use-cases/channel/update-channel.use-case';
import { CreateFormRequestUseCase } from '../../domain/use-cases/form-request/create-form-request.use-case';
import { DeleteFormRequestUseCase } from '../../domain/use-cases/form-request/delete-form-request.use-case';
import { GetFormRequestByIdUseCase } from '../../domain/use-cases/form-request/get-form-request-by-id.use-case';
import { GetFormRequestsUseCase } from '../../domain/use-cases/form-request/get-form-requests.use-case';
import { UpdateFormRequestUseCase } from '../../domain/use-cases/form-request/update-form-request.use-case';
import { GetCitiesByStateUseCase } from '../../domain/use-cases/location/get-cities-by-state.use-case';
import { GetCitiesUseCase } from '../../domain/use-cases/location/get-cities.use-case';
import { GetStatesUseCase } from '../../domain/use-cases/location/get-states.use-case';

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
      this.initializeFormRequestRouter(app),
      this.initializeLocationRouter(app),
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

    const controller = channelController(
      createChannelUseCase,
      getChannelsUseCase,
      getChannelByIdUseCase,
      updateChannelUseCase,
      deleteChannelUseCase,
    );

    const jwtController = new JwtController();

    return new ChannelRouter(
      controller,
      jwtController,
      app,
    );
  }

  private initializeLocationRouter(app: Application): LocationRouter {
    const getCitiesByStateUseCase = new GetCitiesByStateUseCase(
      new CityRepository(new MongooseSource(cityModel)),
      new ResponseMapper(),
    );

    const getStatesUseCase = new GetStatesUseCase(
      new StateRepository(new MongooseSource(stateModel)),
      new ResponseMapper(),
    );

    const getCitiesUseCase = new GetCitiesUseCase(
      new CityRepository(new MongooseSource(cityModel)),
      new ResponseMapper(),
    );

    const controller = locationController(
      getCitiesByStateUseCase,
      getCitiesUseCase,
      getStatesUseCase,
    );


    return new LocationRouter(
      controller,
      app,
    );
  }

  private initializeFormRequestRouter(app: Application): FormRequestRouter {
    const createFormRequestUseCase = new CreateFormRequestUseCase(
      new FormRequestRepository(new MongooseSource(formRequestModel)),
      new ResponseMapper(),
      new FormRequestMapper(),
    );

    const updateFormRequestUseCase = new UpdateFormRequestUseCase(
      new FormRequestRepository(new MongooseSource(formRequestModel)),
      new FormRequestMapper(),
      new ResponseMapper(),
    );

    const getFormRequestsUseCase = new GetFormRequestsUseCase(
      new FormRequestRepository(new MongooseSource(formRequestModel)),
      new ResponseMapper(),
    );
    
    const getFormRequestByIdUseCase = new GetFormRequestByIdUseCase(
      new FormRequestRepository(new MongooseSource(formRequestModel)),
      new ResponseMapper(),
    );

    
    const deleteFormRequestUseCase = new DeleteFormRequestUseCase(
      new FormRequestRepository(new MongooseSource(formRequestModel)),
      new ResponseMapper(),
    );

    const controller = formRequestController(
      createFormRequestUseCase,
      getFormRequestsUseCase,
      getFormRequestByIdUseCase,
      updateFormRequestUseCase,
      deleteFormRequestUseCase,
    );

    const jwtController = new JwtController();

    return new FormRequestRouter(
      controller,
      jwtController,
      app,
    );
  }
}

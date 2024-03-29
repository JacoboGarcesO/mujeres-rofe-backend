import { Application } from 'express';
import { channelController } from '../../../api/controllers/channel.controller';
import { JwtController } from '../../../api/controllers/jwt.controller';
import { ChannelRouter } from '../../../api/routes/channel.routes';
import { channelModel } from '../../../data/models/channel.model';
import { MongooseSource } from '../../../data/mongoose.source';
import { ChannelMapper } from '../../../domain/mappers/channel.mapper';
import { ResponseMapper } from '../../../domain/mappers/response.mapper';
import { ChannelRepository } from '../../../domain/repositories/channel.repository';
import { CreateChannelUseCase } from '../../../domain/use-cases/channel/create-channel.use-case';
import { DeleteChannelUseCase } from '../../../domain/use-cases/channel/delete-channel.use-case';
import { GetChannelByIdUseCase } from '../../../domain/use-cases/channel/get-channel-by-id.use-case';
import { GetChannelsUseCase } from '../../../domain/use-cases/channel/get-channels.use-case';
import { UpdateChannelUseCase } from '../../../domain/use-cases/channel/update-channel.use-case';

export const ChannelRouterInitializer = (app: Application): ChannelRouter => {
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
};

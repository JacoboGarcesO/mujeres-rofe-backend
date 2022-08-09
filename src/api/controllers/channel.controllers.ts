import { Request, Response, NextFunction } from 'express';
import { CreateChannelUseCase } from '../../domain/use-cases/channel/create-channel.use-case';
import { DeleteChannelUseCase } from '../../domain/use-cases/channel/delete-channel.use-case';
import { GetChannelByIdUseCase } from '../../domain/use-cases/channel/get-channel-by-id.use-case';
import { GetChannelsUseCase } from '../../domain/use-cases/channel/get-channels.use-case';
import { UpdateChannelUseCase } from '../../domain/use-cases/channel/update-channel.use-case';
import { ChannelController } from './interfaces/channel-controller.interface';

export const channelController = (
  createChannelUseCase: CreateChannelUseCase,
  getChannelsUseCase: GetChannelsUseCase,
  getChannelByIdUseCase: GetChannelByIdUseCase,
  updateChannelUseCase: UpdateChannelUseCase,
  deleteChannelUseCase: DeleteChannelUseCase,
): ChannelController => ({
  handleCreateChannel: async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await createChannelUseCase.execute(req.body, req.files);
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next(err);
    }
  },
  handleGetChannels: async (_req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await getChannelsUseCase.execute();
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next(err);
    }
  },
  handleGetChannelById: async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await getChannelByIdUseCase.execute(req.params.channelId);
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next(err);
    }
  },
  handleUpdateChannel: async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await updateChannelUseCase.execute(req.body, req.files);
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next(err);
    }
  },
  handleDeleteChannel: async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await deleteChannelUseCase.execute(req.params.channelId);
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next(err);
    }
  },
});

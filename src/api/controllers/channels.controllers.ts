import { Request, Response, NextFunction } from 'express';
import { CreateChannelUseCase } from '../../domain/use-cases/channel/create-channel.use-case';
import { DeleteChannelUseCase } from '../../domain/use-cases/channel/delete-channel.use-case';
import { GetChannelByIdUseCase } from '../../domain/use-cases/channel/get-channel-by-id.use-case';
import { GetChannelsUseCase } from '../../domain/use-cases/channel/get-channels.use-case';
import { UpdateChannelUseCase } from '../../domain/use-cases/channel/update-channel.use-case';

export class ChannelController {
  private createChannelUseCase: CreateChannelUseCase;
  private getChannelsUseCase: GetChannelsUseCase;
  private getChannelByIdUseCase: GetChannelByIdUseCase;
  private updateChannelUseCase: UpdateChannelUseCase;
  private deleteChannelUseCase: DeleteChannelUseCase;

  constructor(
    createChannelUseCase: CreateChannelUseCase,
    getChannelsUseCase: GetChannelsUseCase,
    getChannelByIdUseCase: GetChannelByIdUseCase,
    updateChannelUseCase: UpdateChannelUseCase,
    deleteChannelUseCase: DeleteChannelUseCase,
  ) {
    
    this.createChannelUseCase = createChannelUseCase;
    this.getChannelsUseCase = getChannelsUseCase;
    this.getChannelByIdUseCase = getChannelByIdUseCase;
    this.updateChannelUseCase = updateChannelUseCase;
    this.deleteChannelUseCase = deleteChannelUseCase;
  }

  public async handleCreateChannel(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const execution = await this.createChannelUseCase.execute(req.body, req.files);
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next();
    }
  }

  public async handleGetChannels(_req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      console.log(this);
      const execution = await this.getChannelsUseCase.execute();
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next(err);
    }
  }

  public async handleGetChannelById(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const execution = await this.getChannelByIdUseCase.execute(req.params.channelId);
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next();
    }
  }

  public async handleUpdateChannel(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const execution = await this.updateChannelUseCase.execute(req.body, req.files);
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next();
    }
  }

  public async handleDeleteChannel(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const execution = await this.deleteChannelUseCase.execute(req.params.channelId);
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next();
    }
  }
}

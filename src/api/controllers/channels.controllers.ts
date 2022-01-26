import { Request, Response, NextFunction } from 'express';
import { ChannelMapper } from '../../mappers/channels.mapper';
import { ChannelsService } from '../../services/channels.service';

const channelMapper = new ChannelMapper();
const service = new ChannelsService(channelMapper);

export class ChannelController {

  async create(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const channelCreated = await service.create(request.body);
      return response.status(200).json(channelCreated);
    } catch (err) {
      next(err);
    }
  }
}

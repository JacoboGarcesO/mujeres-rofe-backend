import { Request, Response, NextFunction } from 'express';
import { ChannelMapper } from '../../mappers/channels.mapper';
import { MessagesMapper } from '../../mappers/messages.mapper';
import { ChannelsService } from '../../services/channels.service';

const channelMapper = new ChannelMapper();
const messageMapper = new MessagesMapper();
const service = new ChannelsService(channelMapper, messageMapper);

export class ChannelController {

  async getAll(_request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const channelsResponse = await service.getAll();
      return response.status(200).json(channelsResponse);
    } catch (err) {
      next(err);
    }
  }

  async create(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const channelCreated = await service.create(request.body);
      return response.status(200).json(channelCreated);
    } catch (err) {
      next(err);
    }
  }
}

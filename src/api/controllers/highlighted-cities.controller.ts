import { NextFunction, Request, Response } from 'express';
import { MessagesMapper } from '../../mappers/messages.mapper';
import { HighlightedCityService } from '../../services/highlighted-cities.service';

const messageMapper = new MessagesMapper();
const service = new HighlightedCityService(messageMapper);

export class HighlightedCityController {
  async getAll(_request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const formsResponse = await service.getAll();
      return response.status(200).json(formsResponse);
    } catch (err) {
      next(err);
    }
  }

  async create(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const formCreated = await service.create(request.body);
      return response.status(201).json(formCreated);
    } catch (err) {
      next(err);
    }
  }

  async update(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {      
      const formResponse = await service.update(request.body);
      return response.status(200).json(formResponse);
    } catch (err) {
      next(err);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {      
      const formResponse = await service.delete(request.params.cityId);
      return response.status(200).json(formResponse);
    } catch (err) {
      next(err);
    }
  }
}

import { NextFunction, Request, Response } from 'express';
import { RequestsService } from '../../services/requests.service';
import { MessagesMapper } from '../../mappers/messages.mapper';
import { RequestMapper } from '../../mappers/requests.mapper';

const messageMapper = new MessagesMapper();
const requestMapper = new RequestMapper();
const service = new RequestsService(messageMapper, requestMapper);

export class RequestsController {
  async getAll(_request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const requestsResponse = await service.getAll();
      return response.status(200).json(requestsResponse);
    } catch (err) {
      next(err);
    }
  }

  async getById(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const requestResponse = await service.getById(request.params.requestId);
      return response.status(200).json(requestResponse);
    } catch (err) {
      next(err);
    }
  }

  async create(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {      
      const requestCreated = await service.create(request.body, request.files);
      return response.status(201).json(requestCreated);
    } catch (err) {
      next(err);
    }
  }

  async update(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {      
      const requestResponse = await service.update(request.body);
      return response.status(200).json(requestResponse);
    } catch (err) {
      next(err);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {      
      const requestResponse = await service.delete(request.params.requestId);
      return response.status(200).json(requestResponse);
    } catch (err) {
      next(err);
    }
  }
}

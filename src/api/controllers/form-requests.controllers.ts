import { NextFunction, Request, Response } from 'express';
import { formRequestsService } from '../../services/form-requests.service';
import { MessagesMapper } from '../../domain/mappers/messages.mapper';

const messageMapper = new MessagesMapper();
const service = new formRequestsService(messageMapper);

export class FormRequestsController {
  async getAll(_request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const formsResponse = await service.getAll();
      return response.status(200).json(formsResponse);
    } catch (err) {
      next(err);
    }
  }

  async getById(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const formResponse = await service.getById(request.params.formId);
      return response.status(200).json(formResponse);
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
      const formResponse = await service.delete(request.params.formId);
      return response.status(200).json(formResponse);
    } catch (err) {
      next(err);
    }
  }
}

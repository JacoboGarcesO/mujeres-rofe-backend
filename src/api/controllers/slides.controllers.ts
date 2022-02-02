import { NextFunction, Request, Response } from 'express';
import { MessagesMapper } from '../../mappers/messages.mapper';
import { SlideMapper } from '../../mappers/slides.mapper';
import { SlideService } from '../../services/slides.service';

const slideMapper = new SlideMapper();
const messageMapper = new MessagesMapper();
const service = new SlideService(slideMapper, messageMapper);
export class SlideController {

  async getAll(_request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const slidesResponse = await service.getAll();
      return response.status(200).json(slidesResponse);
    } catch (err) {
      next(err);
    }
  }

  async getById(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const slideResponse = await service.getById(request.params.slideId);
      return response.status(200).json(slideResponse);
    } catch (err) {
      next(err);
    }
  }

  async create(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try{
      const slideResponse = await service.create(request.body, request.file?.path);
      return response.status(200).json(slideResponse);
    } catch (err) {
      next(err);
    }
  }

  async update(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {      
      const slideResponse = await service.update(request.body, request.file?.path);
      return response.status(200).json(slideResponse);
    } catch (err) {
      next(err);
    }
  }
}

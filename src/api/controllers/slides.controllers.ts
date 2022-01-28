import { NextFunction, Request, Response } from 'express';
import { SlideMapper } from '../../mappers/slides.mapper';
import { SlideService } from '../../services/slides.service';

const slideMapper = new SlideMapper();
const service = new SlideService(slideMapper);
export class SlideController {

  async create(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try{
      const slideCreated = await service.create(request.body);
      return response.status(200).json(slideCreated);
    } catch (err) {
      next(err);
    }
  }
}

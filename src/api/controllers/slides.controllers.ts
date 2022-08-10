import { NextFunction, Request, Response } from 'express';
import { CreateSlideUseCase } from '../../domain/use-cases/slide/create-slide.use-case';
import { DeleteSlideUseCase } from '../../domain/use-cases/slide/delete-slide.use-case';
import { GetSlideByIdUseCase } from '../../domain/use-cases/slide/get-slide-by-id.use-case';
import { GetSlidesUseCase } from '../../domain/use-cases/slide/get-slides.use-case';
import { UpdateSlideUseCase } from '../../domain/use-cases/slide/update-slide.use-case';
import { SlideController } from './interfaces/slide-controller.interface';

export const slideController = (
  createSlideUseCase: CreateSlideUseCase,
  updateSlideUseCase: UpdateSlideUseCase,
  deleteSlideUseCase: DeleteSlideUseCase,
  getSlideByIdUseCase: GetSlideByIdUseCase,
  getSlidesUseCase: GetSlidesUseCase,
): SlideController => ({
  handleCreateSlide: async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await createSlideUseCase.execute(req.body, req.file?.path);
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next(err);
    }
  },
  handleGetSlideById: async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await getSlideByIdUseCase.execute(req.params.slideId);
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next(err);
    }
  },
  handleGetSlides: async (_req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await getSlidesUseCase.execute();
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next(err);
    }
  },
  handleUpdateSlide: async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await updateSlideUseCase.execute(req.body, req.file?.path);
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next(err);
    }
  },
  handleDeleteSlide: async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await deleteSlideUseCase.execute(req.params.slideId);
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next(err);
    }
  },
});

import { NextFunction, Request, Response } from 'express';
import { CreateRequestUseCase } from '../../domain/use-cases/request/create-request.use-case';
import { DeleteRequestUseCase } from '../../domain/use-cases/request/delete-request.use-case';
import { GetRequestsUseCase } from '../../domain/use-cases/request/get-requests.use-case';
import { RequestController } from './interfaces/request-controller.interface';

export const requestController = (
  createRequestUseCase: CreateRequestUseCase,
  deleteRequestUseCase: DeleteRequestUseCase,
  getRequestsUseCase: GetRequestsUseCase,
): RequestController => ({
  handleCreateRequest: async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await createRequestUseCase.execute(req.body, req.file?.path);
      return res.status(200).json(execution);
    } catch (err) {
      next(err);
    }
  },
  handleDeleteRequest: async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await deleteRequestUseCase.execute(req.params.requestId);
      return res.status(200).json(execution);
    } catch (err) {
      next(err);
    }
  },
  handleGetRequests: async (_req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await getRequestsUseCase.execute();
      return res.status(200).json(execution);
    } catch (err) {
      next(err);
    }
  },
});

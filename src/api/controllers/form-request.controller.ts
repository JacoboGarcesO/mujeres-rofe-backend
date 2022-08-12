import { NextFunction, Request, Response } from 'express';
import { CreateFormRequestUseCase } from '../../domain/use-cases/form-request/create-form-request.use-case';
import { DeleteFormRequestUseCase } from '../../domain/use-cases/form-request/delete-form-request.use-case';
import { GetFormRequestByIdUseCase } from '../../domain/use-cases/form-request/get-form-request-by-id.use-case';
import { GetFormRequestsUseCase } from '../../domain/use-cases/form-request/get-form-requests.use-case';
import { UpdateFormRequestUseCase } from '../../domain/use-cases/form-request/update-form-request.use-case';
import { FormRequestController } from './interfaces/form-request-controller.interface';

export const formRequestController = (
  createFormRequestUseCase: CreateFormRequestUseCase,
  getFormRequestsUseCase: GetFormRequestsUseCase,
  getFormRequestByIdUseCase: GetFormRequestByIdUseCase,
  updateFormRequestUseCase: UpdateFormRequestUseCase,
  deleteFormRequestUseCase: DeleteFormRequestUseCase,
): FormRequestController => ({
  handleCreateFormRequest: async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await createFormRequestUseCase.execute(req.body);
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next(err);
    }
  },
  handleGetFormRequests: async (_req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await getFormRequestsUseCase.execute();
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next(err);
    }
  },
  handleGetFormRequestById: async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await getFormRequestByIdUseCase.execute(req.params.formRequestId);
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next(err);
    }
  },
  handleUpdateFormRequest: async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await updateFormRequestUseCase.execute(req.body);
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next(err);
    }
  },
  handleDeleteFormRequest: async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await deleteFormRequestUseCase.execute(req.params.formRequestId);
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next(err);
    }
  },
});

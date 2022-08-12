import { NextFunction, Request, Response } from 'express';
import { AuthenticationUseCase } from '../../domain/use-cases/user/authentication.use-case';
import { CreateUserUseCase } from '../../domain/use-cases/user/create-user.use-case';
import { DeleteUserUseCase } from '../../domain/use-cases/user/delete-user.use-case';
import { ForgotPasswordUseCase } from '../../domain/use-cases/user/forgot-password.use-case';
import { GetTotalUsersUseCase } from '../../domain/use-cases/user/get-total-users.use-case';
import { GetUserByIdUseCase } from '../../domain/use-cases/user/get-user-by-id.use-case';
import { GetUsersUseCase } from '../../domain/use-cases/user/get-users.use-case';
import { UpdateUserUseCase } from '../../domain/use-cases/user/update-user.use-case';
import { UserController } from './interfaces/user-controller.interface';

export const userController = (
  authenticationUseCase: AuthenticationUseCase,
  createUserUseCase: CreateUserUseCase,
  deleteUserUseCase: DeleteUserUseCase,
  forgotPasswordUseCase: ForgotPasswordUseCase,
  getTotalUsersUseCase: GetTotalUsersUseCase,
  getUserByIdUseCase: GetUserByIdUseCase,
  getUsersUseCase: GetUsersUseCase,
  updateUserUseCase: UpdateUserUseCase,
): UserController => ({
  handleAuthentication: async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await authenticationUseCase.execute(req.body);
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next(err);
    }
  },
  handleCreateUser: async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await createUserUseCase.execute(req.body, req.files);
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next(err);
    }
  },
  handleDeleteUser: async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await deleteUserUseCase.execute(req.params.userId);
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next(err);
    }
  },
  handleForgotPassword: async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await forgotPasswordUseCase.execute(req.body);
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next(err);
    }
  },
  handleGetTotalUsers: async (_req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await getTotalUsersUseCase.execute();
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next(err);
    }
  },
  handleGetUserById: async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await getUserByIdUseCase.execute(req.params.userId);
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next(err);
    }
  },
  handleGetUsers: async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await getUsersUseCase.execute(req.body);
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next(err);
    }
  },
  handleUpdateUser: async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const execution = await updateUserUseCase.execute(req.body, req.files);
      return res.status(200).json(execution);
    } catch (err) {
      res.status(500).send({ error: err, message: 'Internal server error' });
      next(err);
    }
  },
});

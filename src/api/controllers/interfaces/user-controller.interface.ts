import { NextFunction, Request, Response } from 'express';

export interface UserController {
  handleAuthentication: (req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
  handleForgotPassword: (req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
  handleCreateUser: (req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
  handleDeleteUser: (req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
  handleUpdateUser: (req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
  handleGetUserById: (req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
  handleGetUsers: (req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
  handleGetTotalUsers: (_req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
}

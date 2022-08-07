import { Request, Response, NextFunction } from 'express';
import { UserService } from '../../services/users.service';

const service = new UserService();

export class UserController {
  async getAll(
    _request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const usersResponse = service.getAll();
      return response.status(200).json(usersResponse);
    } catch (err) {
      next(err);
    }
  }

  async getAllByCity(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const usersResponse = await service.getAllByCity(request.params.city);
      return response.status(200).json(usersResponse);
    } catch (err) {
      next(err);
    }
  }

  async getAllByName(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const usersResponse = await service.getByFirstName(request.params.name);
      return response.status(200).json(usersResponse);
    } catch (err) {
      next(err);
    }
  }

  async forgotPassword(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const usersResponse = await service.forgotPassword(request.body?.email);
      return response.status(200).json(usersResponse);
    } catch (err) {
      next(err);
    }
  }

  async getPaginatedUsers(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const from = Number(request.params.from) || 0;
      const usersResponse = await service.getPaginatedUsers(from);
      return response.status(200).json(usersResponse);
    } catch (err) {
      next(err);
    }
  }

  async auth(request: Request, response: Response, next: NextFunction) {
    try {
      const userAuthenticationResponse = await service.auth(request.body);
      return response.status(200).json(userAuthenticationResponse);
    } catch (err) {
      next(err);
    }
  }

  async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const userResponse = await service.create(request.body, request.files);
      return response.status(200).json(userResponse);
    } catch (err) {
      next(err);
    }
  }

  async getById(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const userResponse = await service.getById(request.params.userId);
      return response.status(200).json(userResponse);
    } catch (err) {
      next(err);
    }
  }

  async update(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const userResponse = await service.update(request.body, request.files);
      return response.status(200).json(userResponse);
    } catch (err) {
      next(err);
    }
  }

  async delete(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const userResponse = await service.delete(request.params.userId);
      return response.status(200).json(userResponse);
    } catch (err) {
      next(err);
    }
  }
}

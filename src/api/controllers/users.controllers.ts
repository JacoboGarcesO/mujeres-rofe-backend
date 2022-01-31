import { Request, Response, NextFunction } from 'express';
import { UserMapper } from '../../mappers/users.mapper';
import { UserService } from '../../services/users.service';

const userMapper = new UserMapper();
const service = new UserService(userMapper);
export class UserController {

  async auth(request: Request, response: Response, next: NextFunction) {
    try {
      const userAuthentication = await service.auth(request.body);
      return response.status(200).json(userAuthentication);
    } catch (err) {
      next(err);
    }
  }

  async create(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const userSaved = await service.create(request.body, request.file?.path);
      return response.status(200).json(userSaved);
    } catch (err) {
      next(err);
    }
  }
}

import { Request, Response, NextFunction } from 'express';
import { UserMapper } from '../../mappers/users.mapper';
import { UserService } from '../../services/users.service';

const userMapper = new UserMapper();
const service = new UserService(userMapper);
export class UserController {

  login(_request: Request, response: Response, next: NextFunction) {
    try {
      const token = service.login();
      return response.status(200).json({token});
    } catch (err) {
      next(err);
    }
  }

  async create(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const userSaved = await service.create(request.body);
      return response.status(200).json(userSaved);
    } catch (err) {
      next(err);
    }
  }
}

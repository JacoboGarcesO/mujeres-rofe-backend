import { Request, Response } from 'express';
import { UserMapper } from '../../mappers/users/dto-to-users.mapper';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/users.service';

export class UserController {
  private userMapper = new UserMapper();
  private service = new UserService(this.userMapper);

  async create(request: Request, response: Response): Promise<Response | undefined>  {
    const user = request.body as UserModel;
    const userSaved = await this.service.create(user);

    return response.status(200).json({userSaved, message: 'User was saved successfully'});
  }

}

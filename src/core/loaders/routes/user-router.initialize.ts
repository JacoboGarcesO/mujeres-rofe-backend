import { Application } from 'express';
import { JwtController } from '../../../api/controllers/jwt.controller';
import { userController } from '../../../api/controllers/user.controller';
import { UserRouter } from '../../../api/routes/user.routes';
import { userModel } from '../../../data/models/user.model';
import { MongooseSource } from '../../../data/mongoose.source';
import { EmailMapper } from '../../../domain/mappers/email.mapper';
import { FilterMapper } from '../../../domain/mappers/filter.mapper';
import { ResponseMapper } from '../../../domain/mappers/response.mapper';
import { UserMapper } from '../../../domain/mappers/user.mapper';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { EmailsUseCase } from '../../../domain/use-cases/email/send-email.use-case';
import { AuthenticationUseCase } from '../../../domain/use-cases/user/authentication.use-case';
import { CreateUserUseCase } from '../../../domain/use-cases/user/create-user.use-case';
import { DeleteUserUseCase } from '../../../domain/use-cases/user/delete-user.use-case';
import { ForgotPasswordUseCase } from '../../../domain/use-cases/user/forgot-password.use-case';
import { GetTotalUsersUseCase } from '../../../domain/use-cases/user/get-total-users.use-case';
import { GetUserByIdUseCase } from '../../../domain/use-cases/user/get-user-by-id.use-case';
import { GetUsersUseCase } from '../../../domain/use-cases/user/get-users.use-case';
import { UpdateUserUseCase } from '../../../domain/use-cases/user/update-user.use-case';

export const UserRouterInitializer = (app: Application): UserRouter => {
  const createUserUseCase = new CreateUserUseCase(
    new UserRepository(new MongooseSource(userModel)),
    new UserMapper(),
    new EmailMapper(),
    new EmailsUseCase(),
    new ResponseMapper(),
  );

  const authenticationUseCase = new AuthenticationUseCase(
    new UserRepository(new MongooseSource(userModel)),
    new ResponseMapper(),
  );

  const deleteUserUseCase = new DeleteUserUseCase(
    new UserRepository(new MongooseSource(userModel)),
    new ResponseMapper(),
  );

  const forgotPasswordUseCase = new ForgotPasswordUseCase(
    new UserRepository(new MongooseSource(userModel)),
    new EmailMapper(),
    new EmailsUseCase(),
    new ResponseMapper(),
  );

  const getTotalUsersUseCase = new GetTotalUsersUseCase(
    new UserRepository(new MongooseSource(userModel)),
    new ResponseMapper(),
  );

  const getUserByIdUseCase = new GetUserByIdUseCase(
    new UserRepository(new MongooseSource(userModel)),
    new ResponseMapper(),
  );

  const getUsersUseCase = new GetUsersUseCase(
    new UserRepository(new MongooseSource(userModel)),
    new FilterMapper(),
    new ResponseMapper(),
  );

  const updateUserUseCase = new UpdateUserUseCase(
    new UserRepository(new MongooseSource(userModel)),
    new UserMapper(),
    new ResponseMapper(),
  );

  const controller = userController(
    authenticationUseCase,
    createUserUseCase,
    deleteUserUseCase,
    forgotPasswordUseCase,
    getTotalUsersUseCase,
    getUserByIdUseCase,
    getUsersUseCase,
    updateUserUseCase,
  );

  const jwtController = new JwtController();

  return new UserRouter(
    controller,
    jwtController,
    app,
  );
};

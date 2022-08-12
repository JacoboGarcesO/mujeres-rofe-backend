import { Application } from 'express';
import { JwtController } from '../../../api/controllers/jwt.controller';
import { requestController } from '../../../api/controllers/request.controller';
import { RequestRouter } from '../../../api/routes/request.routes';
import { requestModel } from '../../../data/models/request.model';
import { MongooseSource } from '../../../data/mongoose.source';
import { EmailMapper } from '../../../domain/mappers/email.mapper';
import { RequestMapper } from '../../../domain/mappers/request.mapper';
import { ResponseMapper } from '../../../domain/mappers/response.mapper';
import { RequestRepository } from '../../../domain/repositories/request.repository';
import { EmailsUseCase } from '../../../domain/use-cases/email/send-email.use-case';
import { CreateRequestUseCase } from '../../../domain/use-cases/request/create-request.use-case';
import { DeleteRequestUseCase } from '../../../domain/use-cases/request/delete-request.use-case';
import { GetRequestsUseCase } from '../../../domain/use-cases/request/get-requests.use-case';

export const RequestRouterInitializer = (app: Application): RequestRouter => {
  const createRequestUseCase = new CreateRequestUseCase(
    new RequestRepository(new MongooseSource(requestModel)),
    new RequestMapper(),
    new EmailMapper(),
    new EmailsUseCase(),
    new ResponseMapper(),
  );

  const getRequestsUseCase = new GetRequestsUseCase(
    new RequestRepository(new MongooseSource(requestModel)),
    new ResponseMapper(),
  );

  const deleteRequestUseCase = new DeleteRequestUseCase(
    new RequestRepository(new MongooseSource(requestModel)),
    new ResponseMapper(),
  );

  const controller = requestController(
    createRequestUseCase,
    deleteRequestUseCase,
    getRequestsUseCase,
  );

  const jwtController = new JwtController();

  return new RequestRouter(
    controller,
    jwtController,
    app,
  );
};

import { Application } from 'express';
import { formRequestController } from '../../../api/controllers/form-requestcontrollers';
import { JwtController } from '../../../api/controllers/jwt.controller';
import { FormRequestRouter } from '../../../api/routes/form-request.routes';
import { formRequestModel } from '../../../data/models/form-request.model';
import { MongooseSource } from '../../../data/mongoose.source';
import { FormRequestMapper } from '../../../domain/mappers/form-request.mapper';
import { ResponseMapper } from '../../../domain/mappers/response.mapper';
import { FormRequestRepository } from '../../../domain/repositories/form-request.repository';
import { CreateFormRequestUseCase } from '../../../domain/use-cases/form-request/create-form-request.use-case';
import { DeleteFormRequestUseCase } from '../../../domain/use-cases/form-request/delete-form-request.use-case';
import { GetFormRequestByIdUseCase } from '../../../domain/use-cases/form-request/get-form-request-by-id.use-case';
import { GetFormRequestsUseCase } from '../../../domain/use-cases/form-request/get-form-requests.use-case';
import { UpdateFormRequestUseCase } from '../../../domain/use-cases/form-request/update-form-request.use-case';

export const FormRequestRouterInitializer = (app: Application): FormRequestRouter => {
  const createFormRequestUseCase = new CreateFormRequestUseCase(
    new FormRequestRepository(new MongooseSource(formRequestModel)),
    new ResponseMapper(),
    new FormRequestMapper(),
  );

  const updateFormRequestUseCase = new UpdateFormRequestUseCase(
    new FormRequestRepository(new MongooseSource(formRequestModel)),
    new FormRequestMapper(),
    new ResponseMapper(),
  );

  const getFormRequestsUseCase = new GetFormRequestsUseCase(
    new FormRequestRepository(new MongooseSource(formRequestModel)),
    new ResponseMapper(),
  );
  
  const getFormRequestByIdUseCase = new GetFormRequestByIdUseCase(
    new FormRequestRepository(new MongooseSource(formRequestModel)),
    new ResponseMapper(),
  );

  
  const deleteFormRequestUseCase = new DeleteFormRequestUseCase(
    new FormRequestRepository(new MongooseSource(formRequestModel)),
    new ResponseMapper(),
  );

  const controller = formRequestController(
    createFormRequestUseCase,
    getFormRequestsUseCase,
    getFormRequestByIdUseCase,
    updateFormRequestUseCase,
    deleteFormRequestUseCase,
  );

  const jwtController = new JwtController();

  return new FormRequestRouter(
    controller,
    jwtController,
    app,
  );
};

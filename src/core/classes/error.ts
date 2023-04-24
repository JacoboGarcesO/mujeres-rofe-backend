import { StatusErrorEnum } from "../constants/status-error.enum";

export class ExceptionError extends Error {
  public statusCode: StatusErrorEnum;

  constructor(error: Error, statusCode?: StatusErrorEnum) {
    super(error.message);
    this.stack = error.stack;
    this.name = error.name;
    this.statusCode = statusCode || StatusErrorEnum.internalError;
  }
}
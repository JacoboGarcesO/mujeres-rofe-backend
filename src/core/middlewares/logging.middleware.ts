import { NextFunction, Request, Response } from "express";
import { Logger } from "../utils/logs";
import { StatusErrorEnum } from "../constants/status-error.enum";

export const loggingMiddleware = (request: Request, response: Response, next: NextFunction) => {
  const startTime = new Date().getTime();
  const { method, originalUrl } = request;
  const token = request.header('Authorization');
  const logger = new Logger();

  response.on('finish', () => {
    const endTime = new Date().getTime();
    const responseTime = (endTime - startTime) / 1000;
    const { statusCode } = response;
    const logEntry = `${new Date().toLocaleString()} | ${method} ${originalUrl} ${statusCode} ${responseTime}s`;
    !Object.values(StatusErrorEnum).includes(statusCode) && logger.createInfoLog(logEntry, { token: token === 'null' ? null : token });
  });

  next();
};
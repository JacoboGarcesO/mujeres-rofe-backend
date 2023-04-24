import { Request, Response, NextFunction } from 'express';
import { ExceptionError } from '../classes/error';
import { Logger } from '../utils/logs';

export const errorMiddleware = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const startTime = new Date().getTime();
  const { method, originalUrl } = request;
  const token = request.header('Authorization');
  const logger = new Logger();
  const newError = new ExceptionError(error);

  response.on('finish', () => {
    const endTime = new Date().getTime();
    const responseTime = (endTime - startTime) / 1000;
    const { statusCode } = response;
    newError.statusCode = statusCode;
    const logEntry = `${new Date().toLocaleString()} | ${method} ${originalUrl} ${statusCode} ${responseTime}s`;
    logger.createErrorLog(logEntry, { token: token === 'null' ? null : token, error: newError });
  });

  response.status(500).json({ stack: newError.stack, message: newError.message, status: newError.statusCode });
  next(error);
}; 
import { Response, Request, NextFunction } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { ErrorWithStatus } from '../common/ErrorWithStatus';
import { logUncaughtException, logUnhandledRejection } from './logger';

export const handleErrors = (err: ErrorWithStatus, _req: Request, res: Response, next: NextFunction) => {
  const message = err.message || getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);
  const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;

  // Error handling
  res.status(status).send(message);

  next({ ...err, message, status });
};

export const  handleUnhandledRejection = (reason:Error) => {
  logUnhandledRejection(reason);

  process.exit(1);
}

export const handleUncaughtException = (err: Error) =>  {
  logUncaughtException(err);

  process.exit(1);
}

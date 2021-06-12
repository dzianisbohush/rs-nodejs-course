import fs from 'fs'
import { createLogger, transports, format } from 'winston';
import { Request, Response, NextFunction } from 'express';
import { ErrorWithStatus } from '../common/ErrorWithStatus';

const winstonLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    }),
    new transports.File({ filename: './logs/combined.log' }),
    new transports.File({ filename: './logs/error.log', level: 'error' })
  ]
});

export const logRequest = (req: Request, res: Response, next: NextFunction): void => {
  if (req.body.password) {
    delete req.body.password;
  }

  winstonLogger.info(
    `
    METHOD: ${req.method}
    URL: ${req.originalUrl}
    QUERY PARAMS: ${JSON.stringify(req.query)}
    ROUTE PARAMS: ${JSON.stringify(req.params)}
    BODY: ${JSON.stringify(req.body)}
    STATUS CODE: ${res.statusCode}
`
  );

  next();
};

export const logError = (err: ErrorWithStatus, req: Request, _res: Response, next: NextFunction) => {
  winstonLogger.error(
    `
    METHOD: ${req.method}
    URL: ${req.originalUrl}
    BODY: ${JSON.stringify(req.body)}
    STATUS CODE: ${err.status}
    ERROR MESSAGE: ${err.message}
    `
  );

  next();
};

export const logUnhandledRejection = (reason: Error) => {
  const message = `
  UNHANDLED REJECTION ERROR: ${reason}
  TIME: ${new Date()}
  `

  winstonLogger.error(`UNHANDLED REJECTION ERROR: ${message}`);

  fs.writeFileSync('./logs/error.log', `UNHANDLED REJECTION ERROR: ${message}`)
};

export const logUncaughtException = (err: Error) => {
  winstonLogger.error(
    `
  ERROR: ${err}
  ERROR DETAILS:
  ${err.stack}
  `
  );
};

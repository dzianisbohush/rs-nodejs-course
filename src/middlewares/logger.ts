import { createLogger, transports, format } from 'winston';
import { Request, Response, NextFunction } from 'express';

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

export const logError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  winstonLogger.error(
    `
    TYPE: ${req.method}
    URL: ${req.originalUrl}
    BODY: ${JSON.stringify(req.body)}
    STATUS CODE: ${res.statusCode}
    ERROR MESSAGE: ${err.message}
    ERROR DETAILS:
    ${err.stack}
    `
  );

  next();
};

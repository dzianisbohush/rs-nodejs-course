import express, { Application, Response, Request, NextFunction } from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import userRouter from '../resources/users/user.router';
import boardRouter from '../resources/boards/board.router';
import loginRouter from '../resources/login/login.router';
import tasksRouter from '../resources/tasks/task.router';
import { logRequest, logError } from '../middlewares/logger';
import { handleErrors } from '../middlewares/errorHandler';
import {authMiddleware} from '../resources/login/authentication';

interface ExpressLoaderArgs {
  app: Application
}

export const expressLoader = async ({ app }: ExpressLoaderArgs): Promise<Application> => {
  app.use(express.json());

  // Swagger
  const swaggerDocument = YAML.load(path.join(__dirname, '../../doc/api.yaml'));
  app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  // Test route
  app.use('/', (req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl === '/') {
      res.send('Service is running!\n');
      return;
    }
    next();
  });

  // Logging requests
  app.use([
    '/users/:userId?',
    '/boards/:boardId/tasks/:taskId?',
    '/boards/:boardId?'
  ], logRequest);

  // Routes
  app.use('/users', authMiddleware, userRouter);
  app.use('/login', loginRouter);
  app.use('/boards', authMiddleware, boardRouter);
  app.use('/boards/:boardId/tasks', authMiddleware, tasksRouter);

  app.use(handleErrors, logError);

  // PLACE FOR ANOTHER ROUTERS

  return app;
};


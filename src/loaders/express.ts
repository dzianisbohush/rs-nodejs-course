import express, { Application, Response, Request, NextFunction } from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import userRouter from '../resources/users/user.router';
import boardRouter from '../resources/boards/board.router';
import tasksRouter from '../resources/tasks/task.router';
import { logRequest, logError } from '../middlewares/logger';

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
      res.send('Service is running!');
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
  app.use('/users', userRouter);
  app.use('/boards', boardRouter);
  app.use('/boards/:boardId/tasks', tasksRouter);

  // Logging errors
  app.use(logError);

  // PLACE FOR ANOTHER ROUTERS

  return app;
};


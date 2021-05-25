import express, {Application, Response, Request, NextFunction} from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import userRouter from '../resources/users/user.router';
import boardRouter from '../resources/boards/board.router';
import tasksRouter from '../resources/tasks/task.router';

interface ExpressLoaderArgs {
  app: Application
}

/**
 * Loading express app
 *
 * @param app - express application
 * @returns express application
 */
export const expressLoader = async ({ app }: ExpressLoaderArgs) : Promise<Application> => {
  app.use(express.json());

  const swaggerDocument = YAML.load(path.join(__dirname, '../../doc/api.yaml'));
  app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  app.use('/', (req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl === '/') {
      res.send('Service is running!');
      return;
    }
    next();
  });

  app.use('/users', userRouter);
  //
  app.use('/boards', boardRouter);
  //
  app.use('/boards/:boardId/tasks', tasksRouter);

  // PLACE FOR ANOTHER ROUTERS

  // Return the express app
  return app;
};


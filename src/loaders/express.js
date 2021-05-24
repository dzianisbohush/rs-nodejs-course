import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import userRouter from '../resources/users/user.router.js';
import boardRouter from '../resources/boards/board.router.js';
import tasksRouter from '../resources/tasks/task.router.js';
import {__dirname} from '../common/constants.js';

/**
 * Loading express app
 *
 * @param app - express application
 * @returns express application
 */
export const expressLoader = async ({ app }) => {
  app.use(express.json());

  const swaggerDocument = YAML.load(path.join(__dirname, '../../doc/api.yaml'));
  app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
      res.send('Service is running!');
      return;
    }
    next();
  });

  app.use('/users', userRouter);

  app.use('/boards', boardRouter);

  app.use('/boards/:boardId/tasks', tasksRouter);

  // PLACE FOR ANOTHER ROUTERS

  // Return the express app
  return app;
};


const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('../resources/users/user.router');
const boardRouter = require('../resources/boards/board.router');
const tasksRouter = require('../resources/tasks/task.router');

const expressLoader = async ({ app }) => {
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

module.exports = expressLoader;

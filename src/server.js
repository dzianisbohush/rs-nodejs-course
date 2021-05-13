/* eslint-disable no-console */
const express = require('express');
const loadersInit = require('./loaders');
const { PORT } = require('./common/config');

const startServer = async () => {
  const app = express();

  await loadersInit({ expressApp: app });

  app.listen(PORT, (err) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log(`App is running on http://localhost:${PORT}`);
  });
};

startServer();

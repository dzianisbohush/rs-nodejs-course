/* eslint-disable no-console */
import express from 'express';
import  {loadersInit}  from './loaders/index.js';
import { CONFIG } from './common/config.js';

/**
 * Starting server
 *
 * @returns {Promise<void>}
 */
const startServer = async () => {
  const app = express();

  await loadersInit({ expressApp: app });

  app.listen(CONFIG.PORT, (err) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log(`App is running on http://localhost:${CONFIG.PORT}`);
  });
};

startServer();

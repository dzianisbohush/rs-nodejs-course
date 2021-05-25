/* eslint-disable no-console */
import express, {Application} from 'express';
import  {loadersInit}  from './loaders/index';
import { CONFIG } from './common/config';

/**
 * Starting server
 *
 * @returns {Promise<void>}
 */
const startServer = async (): Promise<void> => {
  const app: Application = express();

  await loadersInit({ expressApp: app });

  app.listen(CONFIG.PORT, () => {
    console.log(`App is running on http://localhost:${CONFIG.PORT}`);
  });
};

startServer();

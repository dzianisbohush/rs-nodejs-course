/* eslint-disable no-console */
import "reflect-metadata"
import express, {Application} from 'express';
import  {loadersInit}  from './loaders';
import { CONFIG } from './common/config';

const startServer = async (): Promise<void> => {
  const app: Application = express();

  await loadersInit({ expressApp: app });

  app.listen(CONFIG.PORT, () => {
    console.log(`App is running on http://localhost:${CONFIG.PORT} `);
  });
};

startServer();

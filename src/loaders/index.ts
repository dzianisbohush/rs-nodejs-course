import { Application } from 'express';
import { expressLoader } from './express';
import { handleUncaughtException , handleUnhandledRejection} from '../middlewares/errorHandler';

export const loadersInit = async ({ expressApp }: { expressApp: Application }) => {
  // PLACE FOR ANOTHER LOADERS INITIALIZATION

  await expressLoader({ app: expressApp });

  process
    .on('unhandledRejection', (reason: Error) => {
      handleUnhandledRejection(reason)
    })
    .on('uncaughtException', (err: Error) => {
      handleUncaughtException(err);
    });
};

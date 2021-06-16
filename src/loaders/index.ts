import { Application } from 'express';
import { postgresQLLoader } from './postgresql';
import { handleUncaughtException , handleUnhandledRejection} from '../middlewares/errorHandler';

export const loadersInit = async ({ expressApp }: { expressApp: Application }) => {
  await postgresQLLoader();

  const {expressLoader} = await import('./express');
  await expressLoader({ app: expressApp });

  process
    .on('unhandledRejection', (reason: Error) => {
      handleUnhandledRejection(reason)
    })
    .on('uncaughtException', (err: Error) => {
      handleUncaughtException(err);
    });
};

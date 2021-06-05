import { Application } from 'express';
import { expressLoader } from './express';

export const loadersInit = async ({ expressApp }: {expressApp: Application}) => {
  // PLACE FOR ANOTHER LOADERS INITIALIZATION

  await expressLoader({ app: expressApp });
};

import { expressLoader } from './express.js';

export const loadersInit = async ({ expressApp }) => {
  // PLACE FOR ANOTHER LOADERS INITIALIZATION

  await expressLoader({ app: expressApp });
};

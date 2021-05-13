const expressLoader = require('./express');

const loadersInit = async ({ expressApp }) => {
  // PLACE FOR ANOTHER LOADERS INITIALIZATION

  await expressLoader({ app: expressApp });
};

module.exports = loadersInit;

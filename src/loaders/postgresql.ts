import { createConnection, Connection } from 'typeorm';
import connectionOptions  from './ormconfig';

export const postgresQLLoader = async (): Promise<Connection> => {
  try {
    const connection = await createConnection(connectionOptions);

    console.log('DB is connected successfully');

    return connection;
  } catch (err) {
    throw new Error(`
      DB is not connected. 
      Error: ${err}
    `);
  }
};


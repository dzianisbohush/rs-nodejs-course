import { createConnection, Connection } from 'typeorm';
import connectionOptions from '../common/ormconfig';

export const postgresQLLoader = async (): Promise<Connection> => {
  try {
    const connection = await createConnection(connectionOptions);

    console.log('DB is connected successfully');

    const { createAdminUser } = await import('../resources/users/user.service');
    createAdminUser();

    return connection;
  } catch (err) {
    throw new Error(`
      DB is not connected. 
      Error: ${err}
    `);
  }
};


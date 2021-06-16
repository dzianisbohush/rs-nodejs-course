import { createConnection } from "typeorm"
import {CONFIG} from '../common/config'

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT
} = CONFIG;

export const postgresQLLoader = async (): Promise<void> => {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: POSTGRES_PORT ? +POSTGRES_PORT : 5432,
      username: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DB,
      entities: [],
    });

    console.log('DB is connected successfully');
  } catch (err) {
    throw new Error(`
      DB is not connected. 
      Error: ${err}
    `);
  }
};


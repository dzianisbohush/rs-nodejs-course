import { createConnection, Connection } from "typeorm"
import {CONFIG} from '../common/config'
import {User} from '../resources/users/user.model';
import { BoardModel } from '../resources/boards/board.model';
import { ColumnModel } from '../resources/boards/column.model';

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT
} = CONFIG;

export const postgresQLLoader = async (): Promise<Connection> => {
  try {
    const connection = await createConnection({
      type: "postgres",
      host: "localhost",
      port: POSTGRES_PORT ? +POSTGRES_PORT : 5432,
      username: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DB,
      synchronize: true,
      dropSchema: false,
      logging: false,
      entities: [User, BoardModel, ColumnModel]
    });

    console.log('DB is connected successfully');

    return connection
  } catch (err) {
    throw new Error(`
      DB is not connected. 
      Error: ${err}
    `);
  }
};


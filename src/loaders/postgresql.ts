import { createConnection, Connection } from "typeorm"
import {CONFIG} from '../common/config'
import {User} from '../resources/users/user.model';
import { BoardModel } from '../resources/boards/board.model';
import { ColumnModel } from '../resources/boards/column.model';
import { TaskModel } from '../resources/tasks/task.model';

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT_INSIDE_CONTAINER
} = CONFIG;

export const postgresQLLoader = async (): Promise<Connection> => {
  try {
    const connection = await createConnection({
      type: "postgres",
      host: "postgres",
      port: POSTGRES_PORT_INSIDE_CONTAINER ? +POSTGRES_PORT_INSIDE_CONTAINER : 5432,
      username: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DB,
      synchronize: true,
      dropSchema: false,
      logging: false,
      entities: [User, BoardModel, ColumnModel, TaskModel]
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


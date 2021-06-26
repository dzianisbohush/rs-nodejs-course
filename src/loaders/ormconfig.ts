import { ConnectionOptions } from 'typeorm';
import { CONFIG } from '../common/config';
import { User } from '../resources/users/user.model';
import { BoardModel } from '../resources/boards/board.model';
import { ColumnModel } from '../resources/boards/column.model';
import { TaskModel } from '../resources/tasks/task.model';

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT_INSIDE_CONTAINER,
  POSTGRES_HOST
} = CONFIG;

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: POSTGRES_PORT_INSIDE_CONTAINER ? +POSTGRES_PORT_INSIDE_CONTAINER : 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  logging: false,
  entities: [User, BoardModel, ColumnModel, TaskModel],
  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  dropSchema: false,
  migrations: ['./src/migrations/**/*.ts'],
  migrationsRun: false,
  cli: {
    migrationsDir: 'src/migrations'
  }
}

export default connectionOptions

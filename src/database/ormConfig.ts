import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from '../resources/user/user.entity';
import { BoardEntity } from '../resources/board/board.entity';
import { ColumnEntity } from '../resources/board/column.entity';
import { TaskEntity } from '../resources/task/task.entity';

class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: configService.get('POSTGRES_HOST'),
      port: configService.get('POSTGRES_PORT'),
      username: configService.get('POSTGRES_USER'),
      password: configService.get('POSTGRES_PASSWORD'),
      database: configService.get('POSTGRES_DB'),
      logging: false,
      entities: [UserEntity, BoardEntity, ColumnEntity, TaskEntity],
      // If you are using migrations, synchronize should be set to false.
      synchronize: true,
      dropSchema: false,
      migrations: ['./src/migrations/**/*.ts'],
      migrationsRun: false,
      cli: {
        migrationsDir: 'src/migrations',
      },
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService],
};

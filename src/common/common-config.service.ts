import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from '../resources/user/user.entity';
import { BoardEntity } from '../resources/board/board.entity';
import { ColumnEntity } from '../resources/board/column.entity';
import { TaskEntity } from '../resources/task/task.entity';

@Injectable()
export class CommonConfigService {
  constructor(private readonly configService: ConfigService) {}

  get PORT(): number {
    return +this.configService.get('PORT') || 4000;
  }

  get OrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get('POSTGRES_HOST'),
      port: this.configService.get('POSTGRES_PORT'),
      username: this.configService.get('POSTGRES_USER'),
      password: this.configService.get('POSTGRES_PASSWORD'),
      database: this.configService.get('POSTGRES_DB'),
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

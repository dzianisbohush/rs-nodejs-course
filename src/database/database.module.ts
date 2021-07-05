import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../resources/user/user.entity';
import { BoardEntity } from '../resources/board/board.entity';
import { ColumnEntity } from '../resources/board/column.entity';
import { TaskEntity } from '../resources/task/task.entity';

//@todo add env
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'кщще',
      database: 'dbnest',
      entities: [UserEntity, BoardEntity, ColumnEntity, TaskEntity],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}

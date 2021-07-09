import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from './board.controller';
import { BoardEntity } from './board.entity';
import { ColumnEntity } from './column.entity';
import { BoardService } from './board.service';
import { TaskModule } from '../task/task.module';

@Module({
  controllers: [BoardController],
  imports: [TaskModule, TypeOrmModule.forFeature([BoardEntity, ColumnEntity])],
  providers: [BoardService],
})
export class BoardModule {}

import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { TaskService } from './task.service';

@Module({
  controllers: [TaskController],
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}

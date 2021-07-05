import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  getAll(boardId: string) {
    return this.taskRepository
      .createQueryBuilder('task')
      .where('task.boardId = :boardId', { boardId })
      .getMany();
  }

  async createTask(boardId: string, task: CreateTaskDto) {
    const { generatedMaps } = await this.taskRepository
      .createQueryBuilder()
      .insert()
      .into(TaskEntity)
      .values([{ ...task, boardId }])
      .execute();

    return this.getTaskById(
      generatedMaps?.[0]?.['boardId'],
      generatedMaps?.[0]?.['id'],
    );
  }

  getTaskById(boardId: string, taskId: string) {
    return this.taskRepository
      .createQueryBuilder('task')
      .where('task.boardId = :boardId', { boardId })
      .andWhere('task.id = :taskId', { taskId })
      .getOne();
  }

  async updateTask(
    boardId: string,
    taskId: string,
    updatedTask: UpdateTaskDto,
  ) {
    await this.taskRepository
      .createQueryBuilder()
      .update(TaskEntity)
      .set(updatedTask)
      .where('boardId = :boardId', { boardId })
      .andWhere('id = :taskId', { taskId })
      .execute();

    return this.getTaskById(boardId, taskId);
  }

  deleteTaskById(boardId: string, taskId: string) {
    return this.taskRepository
      .createQueryBuilder()
      .delete()
      .from(TaskEntity)
      .where('boardId = :boardId', { boardId })
      .andWhere('id = :taskId', { taskId })
      .execute();
  }

  async unAssignUserId(userId: string) {
    return this.taskRepository
      .createQueryBuilder()
      .update(TaskEntity)
      .set({ userId: null })
      .where('userId = :userId', { userId })
      .execute();
  }

  deleteTasksForParticularBoardId(boardId: string) {
    return this.taskRepository
      .createQueryBuilder()
      .delete()
      .from(TaskEntity)
      .where('boardId = :boardId', { boardId })
      .execute();
  }
}

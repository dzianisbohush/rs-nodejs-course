import { EntityRepository, Repository, getConnection } from 'typeorm';
import { ITask, TaskModel } from './task.model';

@EntityRepository(TaskModel)
class TasksRepository extends Repository<TaskModel> {
  getAll(boardId: string) {
    return this.createQueryBuilder('task')
      .where('task.boardId = :boardId', { boardId })
      .getMany();
  }

  async createTask(boardId: string, task: Partial<ITask>) {
    const { generatedMaps } = await this.createQueryBuilder()
      .insert()
      .into(TaskModel)
      .values([{ ...task, boardId }])
      .execute();

    return this.getTaskById(generatedMaps?.[0]?.['boardId'], generatedMaps?.[0]?.['id']);
  }

  getTaskById(boardId: string, taskId: string) {
    return this.createQueryBuilder('task')
      .where('task.boardId = :boardId', { boardId })
      .andWhere('task.id = :taskId', { taskId })
      .getOne();
  }

  async updateTask(boardId: string, taskId: string, updatedTask:Partial<ITask>){
    await this.createQueryBuilder()
      .update(TaskModel)
      .set(updatedTask)
      .where('boardId = :boardId', { boardId })
      .andWhere('id = :taskId', { taskId })
      .execute();

    return this.getTaskById(boardId, taskId)
  }

  deleteTaskById(boardId: string, taskId: string) {
    return this.createQueryBuilder()
      .delete()
      .from(TaskModel)
      .where('boardId = :boardId', { boardId })
      .andWhere('id = :taskId', { taskId })
      .execute();
  }

  async unAssignUserId(userId: string) {
    return this.createQueryBuilder()
      .update(TaskModel)
      .set({userId: null})
      .where('userId = :userId', { userId })
      .execute();
  }


  deleteTasksForParticularBoardId(boardId: string) {
    return this.createQueryBuilder()
      .delete()
      .from(TaskModel)
      .where('boardId = :boardId', { boardId })
      .execute();
  }
}

export const tasksRepository = getConnection().getCustomRepository(TasksRepository);

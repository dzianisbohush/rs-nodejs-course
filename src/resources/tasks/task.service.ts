import {tasksRepository} from './task.repository';
import { ITask } from './task.model';

export const getAll = (boardId: string) => tasksRepository.getAll(boardId);

export const createTask = (boardId: string, task: Partial<ITask>) => tasksRepository.createTask(boardId, task);

export const getTaskById = (boardId: string, taskId: string) => tasksRepository.getTaskById(boardId, taskId);

export const updateTask = (boardId: string, taskId: string, updatedTask: Partial<ITask>) =>
  tasksRepository.updateTask(boardId, taskId, updatedTask);

export const deleteTaskById = (boardId: string, taskId: string) => tasksRepository.deleteTaskById(boardId, taskId);

export const unAssignUserId = (userId: string) => tasksRepository.unAssignUserId(userId);

export const deleteTasksForParticularBoardId = (boardId: string) => tasksRepository.deleteTasksForParticularBoardId(boardId);



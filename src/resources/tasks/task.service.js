import * as  tasksRepository from './task.memory.repository.js';

export const getAll = boardId => tasksRepository.getAll(boardId);

export const createTask = (boardId, task) => tasksRepository.createTask(boardId, task);

export const getTaskById = (boardId, taskId) => tasksRepository.getTaskById(boardId, taskId);

export const updateTask = (boardId, taskId, updatedTask) =>
  tasksRepository.updateTask(boardId, taskId, updatedTask);

export const deleteTaskById = (boardId, taskId) => tasksRepository.deleteTaskById(boardId, taskId);

export const unAssignUserId = (userId) => tasksRepository.unAssignUserId(userId);

export const deleteTasksForParticularBoardId = (boardId) => tasksRepository.deleteTasksForParticularBoardId(boardId);



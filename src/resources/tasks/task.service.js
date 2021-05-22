const tasksRepository = require('./task.memory.repository');

const getAll = boardId => tasksRepository.getAll(boardId);

const createTask = (boardId, task) => tasksRepository.createTask(boardId, task);

const getTaskById = (boardId, taskId) => tasksRepository.getTaskById(boardId, taskId);

const updateTask = (boardId, taskId, updatedTask) =>
  tasksRepository.updateTask(boardId, taskId, updatedTask);

const deleteTaskById = (boardId, taskId) => tasksRepository.deleteTaskById(boardId, taskId);

const unAssignUserId = (userId) => tasksRepository.unAssignUserId(userId);

const deleteTasksForParticularBoardId = (boardId) => tasksRepository.deleteTasksForParticularBoardId(boardId);

module.exports = {
  getAll,
  getTaskById,
  createTask,
  updateTask,
  deleteTaskById,
  unAssignUserId,
  deleteTasksForParticularBoardId
};

const Task = require('./task.model');

let TASKS = []

const getAll = async boardId => TASKS.filter(task => task.boardId === boardId);

const createTask = async (boardId, task) => {
  const createdTask = new Task({ ...task, boardId });

  TASKS.push(createdTask);

  return createdTask;
};

const getTaskById = async (boardId, taskId) => TASKS.find(task => task.boardId === boardId && task.id === taskId);

const updateTask = async (boardId, taskId, newTaskData) => {
  let updatedTask = null;

  TASKS = TASKS.map(task => {
    if (task.boardId === boardId && task.id === taskId) {
      updatedTask = { ...task, ...newTaskData };

      return updatedTask;
    }

    return task;
  });

  return updatedTask;
};

const deleteTaskById = async (boardId, taskId) => {
  const indexOfDeletingTask = TASKS.findIndex(task => task.boardId === boardId && task.id === taskId);

  if (indexOfDeletingTask !== -1) {
    TASKS.splice(indexOfDeletingTask, 1);
  }
};

module.exports = {
  getAll,
  getTaskById,
  createTask,
  updateTask,
  deleteTaskById,
  TASKS
};

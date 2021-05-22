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

const unAssignUserId =  (userId) => {
  TASKS.forEach(async (task) => {
    if(task.userId === userId) {
      await updateTask(task.boardId, task.id, {...task, userId: null})
    }
  })
}

const deleteTaskById = async (boardId, taskId) => {
  const indexOfDeletingTask = TASKS.findIndex(task => task.boardId === boardId && task.id === taskId);

  if (indexOfDeletingTask !== -1) {
    TASKS.splice(indexOfDeletingTask, 1);
  }
};

const deleteTasksForParticularBoardId = async (boardId) => {
  const tasksForDeleting = TASKS.filter(task => task.boardId === boardId);

  await Promise.all(tasksForDeleting.map((task) => deleteTaskById(boardId, task.id)));
}

module.exports = {
  getAll,
  getTaskById,
  createTask,
  updateTask,
  deleteTaskById,
  unAssignUserId,
  deleteTasksForParticularBoardId
};

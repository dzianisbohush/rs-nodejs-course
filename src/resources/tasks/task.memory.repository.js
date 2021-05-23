const Task = require('./task.model');

let TASKS = []

/**
 * Getting all tasks for particular board id
 *
 * @category Resources / Task
 * @param {string} boardId - board id
 * @returns {Promise<Task[]>} list of tasks
 */
const getAll = async boardId => TASKS.filter(task => task.boardId === boardId);

/**
 * Adding new task
 *
 * @category Resources / Task
 * @param {string} boardId - board id
 * @param {Partial<Task>} task - new task data
 * @returns {Promise<Task>} created task
 */
const createTask = async (boardId, task) => {
  const createdTask = new Task({ ...task, boardId });

  TASKS.push(createdTask);

  return createdTask;
};

/**
 * Getting task by id
 *
 * @category Resources / Task
 * @param {string} boardId - board id
 * @param {string} taskId - task id
 * @returns {Promise<Task>} found task
 */
const getTaskById = async (boardId, taskId) => TASKS.find(task => task.boardId === boardId && task.id === taskId);

/**
 * Updating task data
 *
 * @category Resources / Task
 * @param {string} boardId - board id
 * @param {string} taskId - task id
 * @param {Partial<Task>} newTaskData - new task data
 * @returns {Promise<Task>} updated task
 */
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

/**
 * Unassigning user id for task
 *
 * @category Resources / Task
 * @param {string} userId
 */
const unAssignUserId =  (userId) => {
  TASKS.forEach(async (task) => {
    if(task.userId === userId) {
      await updateTask(task.boardId, task.id, {...task, userId: null})
    }
  })
}

/**
 * Deleting task by id
 *
 * @category Resources / Task
 * @param {string} boardId - board id
 * @param {string} taskId - task id
 * @returns {Promise<void>}
 */
const deleteTaskById = async (boardId, taskId) => {
  const indexOfDeletingTask = TASKS.findIndex(task => task.boardId === boardId && task.id === taskId);

  if (indexOfDeletingTask !== -1) {
    TASKS.splice(indexOfDeletingTask, 1);
  }
};

/**
 * Deleting tasks when particular board is deleted
 *
 * @category Resources / Task
 * @param {string} boardId - board id
 * @returns {Promise<void>}
 */
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

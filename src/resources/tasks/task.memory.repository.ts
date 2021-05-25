import { Task } from './task.model';

let TASKS: Task[] = [];

/**
 * Getting all tasks for particular board id
 *
 * @category Resources / Task
 * @param {string} boardId - board id
 * @returns {Promise<Task[]>} list of tasks
 */
export const getAll = async (boardId: string): Promise<Task[]> => TASKS.filter(task => task.boardId === boardId);

/**
 * Adding new task
 *
 * @category Resources / Task
 * @param {string} boardId - board id
 * @param {Partial<Task>} task - new task data
 * @returns {Promise<Task>} created task
 */
export const createTask = async (boardId: string, task: Partial<Task>): Promise<Task> => {
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
export const getTaskById = async (boardId: string, taskId: string): Promise<Task | null> => {
  const foundTask = TASKS.find(task => task.boardId === boardId && task.id === taskId);

  return foundTask || null;
};

/**
 * Updating task data
 *
 * @category Resources / Task
 * @param {string} boardId - board id
 * @param {string} taskId - task id
 * @param {Partial<Task>} newTaskData - new task data
 * @returns {Promise<Task>} updated task
 */
export const updateTask = async (boardId: string, taskId: string, newTaskData: Partial<Task>): Promise<Task | null> => {
  let updatedTask;

  TASKS = TASKS.map(task => {
    if (task.boardId === boardId && task.id === taskId) {
      updatedTask = { ...task, ...newTaskData };

      return updatedTask;
    }

    return task;
  });

  return updatedTask || null;
};

/**
 * Unassigning user id for task
 *
 * @category Resources / Task
 * @param {string} userId
 */
export const unAssignUserId = (userId: string): void => {
  TASKS.forEach(async (task) => {
    if (task.userId === userId) {
      await updateTask(task.boardId, task.id, { ...task, userId: null });
    }
  });
};

/**
 * Deleting task by id
 *
 * @category Resources / Task
 * @param {string} boardId - board id
 * @param {string} taskId - task id
 * @returns {Promise<void>}
 */
export const deleteTaskById = async (boardId: string, taskId: string): Promise<void> => {
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
export const deleteTasksForParticularBoardId = async (boardId: string): Promise<void> => {
  const tasksForDeleting = TASKS.filter(task => task.boardId === boardId);

  await Promise.all(tasksForDeleting.map((task) => deleteTaskById(boardId, task.id)));
};

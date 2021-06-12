import { Task } from './task.model';

let TASKS: Task[] = [];

export const getAll = async (boardId: string): Promise<Task[]> => TASKS.filter(task => task.boardId === boardId);

export const createTask = async (boardId: string, task: Partial<Task>): Promise<Task> => {
  const createdTask = new Task({ ...task, boardId });

  TASKS.push(createdTask);

  return createdTask;
};

export const getTaskById = async (boardId: string, taskId: string): Promise<Task | null> => {
  const foundTask = TASKS.find(task => task.boardId === boardId && task.id === taskId);

  return foundTask || null;
};

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

export const unAssignUserId = (userId: string): void => {
  TASKS.forEach(async (task) => {
    if (task.userId === userId) {
      await updateTask(task.boardId, task.id, { ...task, userId: null });
    }
  });
};

export const deleteTaskById = async (boardId: string, taskId: string): Promise<void> => {
  const indexOfDeletingTask = TASKS.findIndex(task => task.boardId === boardId && task.id === taskId);

  if (indexOfDeletingTask !== -1) {
    TASKS.splice(indexOfDeletingTask, 1);
  }
};

export const deleteTasksForParticularBoardId = async (boardId: string): Promise<void> => {
  const tasksForDeleting = TASKS.filter(task => task.boardId === boardId);

  await Promise.all(tasksForDeleting.map((task) => deleteTaskById(boardId, task.id)));
};

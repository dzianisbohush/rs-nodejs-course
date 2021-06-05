import express from 'express';
import * as tasksService from './task.service';
import { getBoardById } from '../boards/board.service';
import { Task } from './task.model';

const router = express.Router({ mergeParams: true });

/**
 * GET All tasks for particular board id
 */
router.route('/').get(async (req, res) => {
  let board;
  const { boardId } = req.params;

  if (boardId) {
    board = await getBoardById(boardId);

    if (!board) {
      res.status(404).end('Board not found');
    }

    const allTasks = await tasksService.getAll(boardId);

    if (allTasks) {
      res.status(200).send(allTasks.map(Task.toResponse));
    } else {
      res.status(404).end('Tasks not found');
    }
  }
});

/**
 * Create (POST) new task
 */
router.route('/').post(async (req, res) => {
  let task;
  const { boardId } = req.params;

  if (boardId) {
    task = await tasksService.createTask(boardId, req.body);
  }

  if (task) {
    res.status(201).send(Task.toResponse(task));
  } else {
    res.status(404).end('Task is not created');
  }
});

/**
 * GET Task by bord id and task id
 */
router.route('/:taskId').get(async (req, res) => {
  let task;
  const { boardId, taskId } = req.params;

  if (boardId && taskId) {
    task = await tasksService.getTaskById(boardId, taskId);
  }

  if (task) {
    res.status(200).send(Task.toResponse(task));
  } else {
    res.status(404).end('Task not found');
  }
});

/**
 * Update task (PUT)
 */
router.route('/:taskId').put(async (req, res) => {
  let task;
  const { body, params: { boardId, taskId } } = req;

  if (boardId && taskId) {
    task = await tasksService.updateTask(boardId, taskId, body);
  }

  if (task) {
    res.status(200).send(Task.toResponse(task));
  } else {
    res.status(404).end('Task is not updated');
  }
});

/**
 * DELETE task by id
 */
router.route('/:taskId').delete(async (req, res) => {
  try {
    const { boardId, taskId } = req.params;

    if (boardId && taskId) {
      await tasksService.deleteTaskById(boardId, taskId);
      res.status(204).send('The task has been deleted');
    }
  } catch (e) {
    res.status(404).end('Task is not deleted');
  }
});

export default router;

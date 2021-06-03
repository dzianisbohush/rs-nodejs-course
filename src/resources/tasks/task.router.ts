import express from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import * as tasksService from './task.service';
import { getBoardById } from '../boards/board.service';
import { Task } from './task.model';

const router = express.Router({ mergeParams: true });

/**
 * GET All tasks for particular board id
 */
router.route('/').get(async (req, res, next) => {
  try {
    let board;
    const { boardId } = req.params;

    if (boardId) {
      board = await getBoardById(boardId);

      if (!board) {
        res.status(StatusCodes.NOT_FOUND).end(getReasonPhrase(StatusCodes.NOT_FOUND));

        next(new Error(getReasonPhrase(StatusCodes.NOT_FOUND)));
      }

      const allTasks = await tasksService.getAll(boardId);

      if (allTasks) {
        res.status(StatusCodes.OK).send(allTasks.map(Task.toResponse));
      } else {
        res.status(StatusCodes.NOT_FOUND).end(getReasonPhrase(StatusCodes.NOT_FOUND));

        next(new Error(getReasonPhrase(StatusCodes.NOT_FOUND)));
      }
    }
  } catch (err) {
    next(err);
  }
});

/**
 * Create (POST) new task
 */
router.route('/').post(async (req, res, next) => {
  try {
    let task;
    const { boardId } = req.params;

    if (boardId) {
      task = await tasksService.createTask(boardId, req.body);
    }

    if (task) {
      res.status(StatusCodes.CREATED).send(Task.toResponse(task));
    } else {
      res.status(StatusCodes.NOT_FOUND).end(getReasonPhrase(StatusCodes.NOT_FOUND));

      next(new Error(getReasonPhrase(StatusCodes.NOT_FOUND)));
    }
  } catch (err) {
    next(err);
  }
});

/**
 * GET Task by bord id and task id
 */
router.route('/:taskId').get(async (req, res, next) => {
  try {
    let task;
    const { boardId, taskId } = req.params;

    if (boardId && taskId) {
      task = await tasksService.getTaskById(boardId, taskId);
    }

    if (task) {
      res.status(StatusCodes.OK).send(Task.toResponse(task));
    } else {
      res.status(StatusCodes.NOT_FOUND).end(getReasonPhrase(StatusCodes.NOT_FOUND));

      next(new Error(getReasonPhrase(StatusCodes.NOT_FOUND)));
    }
  } catch (err) {
    next(err);
  }
});

/**
 * Update task (PUT)
 */
router.route('/:taskId').put(async (req, res, next) => {
  try {
    let task;
    const { body, params: { boardId, taskId } } = req;

    if (boardId && taskId) {
      task = await tasksService.updateTask(boardId, taskId, body);
    }

    if (task) {
      res.status(StatusCodes.OK).send(Task.toResponse(task));
    } else {
      res.status(StatusCodes.NOT_FOUND).end(getReasonPhrase(StatusCodes.NOT_FOUND));

      next(new Error(getReasonPhrase(StatusCodes.NOT_FOUND)));
    }
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE task by id
 */
router.route('/:taskId').delete(async (req, res, next) => {
  try {
    const { boardId, taskId } = req.params;

    if (boardId && taskId) {
      await tasksService.deleteTaskById(boardId, taskId);
      res.status(StatusCodes.NO_CONTENT).send(getReasonPhrase(StatusCodes.NO_CONTENT));
    }
  } catch (err) {
    next(err);
  }
});

export default router;

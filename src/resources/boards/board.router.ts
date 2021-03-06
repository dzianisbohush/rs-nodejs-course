import express from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import * as  boardService from './board.service';
import * as tasksService from '../tasks/task.service';
import { ErrorWithStatus } from '../../common/ErrorWithStatus';

const router = express.Router();

/**
 * GET All boards
 */
router.route('/').get(async (_, res, next) => {
  try {
    const boards = await boardService.getAll();
    res.json(boards);
  } catch (err) {
    next(err);
  }
});

/**
 * Create (POST) new board
 */
router.route('/').post(async (req, res, next) => {
  try {
    const newBoard = await boardService.addNewBoard(req.body);

    if (newBoard) {
      res.status(StatusCodes.CREATED).send(newBoard);
    } else {
      next(new ErrorWithStatus(getReasonPhrase(StatusCodes.NOT_FOUND), StatusCodes.NOT_FOUND));
    }
  } catch (err) {
    next(err);
  }
});

/**
 * GET board by id
 */
router.route('/:boardId').get(async (req, res, next) => {
  try {
    let board;
    const { boardId } = req.params;

    if (boardId) {
      board = await boardService.getBoardById(boardId);
    }

    if (board) {
      res.status(StatusCodes.OK).send(board);
    } else {
      next(new ErrorWithStatus(getReasonPhrase(StatusCodes.NOT_FOUND), StatusCodes.NOT_FOUND));
    }
  } catch (err) {
    next(err);
  }
});

/**
 * Update (PUT) board
 */
router.route('/:boardId').put(async (req, res, next) => {
  try {
    let board;
    const { boardId } = req.params;

    if (boardId) {
      board = await boardService.updateBoard(boardId, req.body);
    }

    if (board) {
      res.status(StatusCodes.OK).send(board);
    } else {
      next(new ErrorWithStatus(getReasonPhrase(StatusCodes.NOT_FOUND), StatusCodes.NOT_FOUND));
    }
  } catch (err) {
    next(err)
  }
});

/**
 * DELETE board by id
 */
router.route('/:boardId').delete(async (req, res, next) => {
  try {
    const { boardId } = req.params;

    if (boardId) {
      // deleting board
      await boardService.deleteBoardById(boardId);

      // deleting tasks for particular board
      await tasksService.deleteTasksForParticularBoardId(boardId);

      res.status(StatusCodes.NO_CONTENT).send(getReasonPhrase(StatusCodes.NO_CONTENT));
    }
  } catch (err) {
    next(err)
  }
});

export default router;

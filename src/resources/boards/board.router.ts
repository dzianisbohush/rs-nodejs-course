import express from 'express';
import { StatusCodes } from 'http-status-codes';
import * as  boardService from './board.service';
import { Board } from './board.model';
import * as tasksService from '../tasks/task.service';

const router = express.Router();

/**
 * GET All boards
 */
router.route('/').get(async (_, res) => {
  const boards = await boardService.getAll();
  res.json(boards.map(Board.toResponse));
});

/**
 * Create (POST) new board
 */
router.route('/').post(async (req, res) => {
  const newBoard = await boardService.addNewBoard(req.body);

  if (newBoard) {
    res.status(StatusCodes.CREATED).send(Board.toResponse(newBoard));
  } else {
    res.status(StatusCodes.NOT_FOUND).end('Board is not created');
  }
});

/**
 * GET board by id
 */
router.route('/:boardId').get(async (req, res) => {
  let board;
  const { boardId } = req.params;

  if (boardId) {
    board = await boardService.getBoardById(boardId);
  }

  if (board) {
    res.status(StatusCodes.OK).send(Board.toResponse(board));
  } else {
    res.status(StatusCodes.NOT_FOUND).end('Board not found');
  }
});

/**
 * Update (PUT) board
 */
router.route('/:boardId').put(async (req, res) => {
  let board;
  const { boardId } = req.params;

  if (boardId) {
    board = await boardService.updateBoard(boardId, req.body);
  }

  if (board) {
    res.status(StatusCodes.OK).send(Board.toResponse(board));
  } else {
    res.status(StatusCodes.NOT_FOUND).end('Board is not updated');
  }
});

/**
 * DELETE board by id
 */
router.route('/:boardId').delete(async (req, res) => {
  try {
    const { boardId } = req.params;

    if (boardId) {
      // deleting board
      await boardService.deleteBoardById(boardId);

      // deleting tasks for particular board
      await tasksService.deleteTasksForParticularBoardId(boardId);

      res.status(StatusCodes.NO_CONTENT).send('Board has been deleted');
    }
  } catch (e) {
    res.status(StatusCodes.NOT_FOUND).end('Board has not been deleted');
  }
});

export default router;

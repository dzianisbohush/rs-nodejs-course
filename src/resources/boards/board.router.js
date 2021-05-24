import express from 'express';
import * as  boardService from './board.service.js';
import { Board } from './board.model.js';
import * as tasksService from '../tasks/task.service.js';

const router = express.Router();

/**
 * GET All boards
 */
router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  res.json(boards.map(Board.toResponse));
});

/**
 * Create (POST) new board
 */
router.route('/').post(async (req, res) => {
  const newBoard = await boardService.addNewBoard(req.body);

  if (newBoard) {
    res.status(201).send(Board.toResponse(newBoard));
  } else {
    res.status(404).end('Board is not created');
  }
});

/**
 * GET board by id
 */
router.route('/:id').get(async (req, res) => {
  const board = await boardService.getBoardById(req.params.id);

  if (board) {
    res.status(200).send(Board.toResponse(board));
  } else {
    res.status(404).end('Board not found');
  }
});

/**
 * Update (PUT) board
 */
router.route('/:id').put(async (req, res) => {
  const board = await boardService.updateBoard(req.params.id, req.body);

  if (board) {
    res.status(200).send(Board.toResponse(board));
  } else {
    res.status(404).end('Board is not updated');
  }
});

/**
 * DELETE board by id
 */
router.route('/:id').delete(async (req, res) => {
  try {
    const boardId = req.params.id;

    // deleting board
    await boardService.deleteBoardById(boardId);

    // deleting tasks for particular board
    await tasksService.deleteTasksForParticularBoardId(boardId);

    res.status(204).send('Board has been deleted');
  } catch (e) {
    res.status(404).end('Board has not been deleted');
  }
});

export default router;

const router = require('express').Router();
const boardService = require('./board.service');
const Board = require('./board.model');

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

  if(newBoard) {
    res.status(200).send(Board.toResponse(newBoard));
  }else {
    res.status(404).end('Board is not created');
  }
});

/**
 * GET board by id
 */
router.route('/:id').get(async (req, res) => {
  const board = await boardService.getBoardById(req.params.id);

  if (board) {
    res.status(200).send(Board.toResponse(board))
  } else {
    res.status(404).end('Board not found');
  }
});

/**
 * Update (PUT) board
 */
router.route('/:id').put(async (req, res) => {
  const board = await boardService.updateBoard(req.params.id, req.body);

  if(board) {
    res.status(200).send(Board.toResponse(board));
  } else {
    res.status(404).end('Board is not updated')
  }
});

/**
 * DELETE border by id
 */
router.route('/:id').delete(async () => {
// @TODO delete border by id
  // When somebody DELETEs Board, all its Tasks should be deleted as well.
});

module.exports = router;

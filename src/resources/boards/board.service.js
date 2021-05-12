const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const addNewBoard = board => boardsRepo.addNewBoard(board);

const getBoardById = id => boardsRepo.getBoardById(id);

const updateBoard = (id, updatedBoard) =>
  boardsRepo.updateBoard(id, updatedBoard);

const deleteBoardById = id => boardsRepo.deleteBoardById(id);

module.exports = { getAll, getBoardById, addNewBoard, updateBoard, deleteBoardById };

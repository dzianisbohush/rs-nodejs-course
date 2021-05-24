import * as boardsRepo from './board.memory.repository.js';

export const getAll = () => boardsRepo.getAll();

export const addNewBoard = board => boardsRepo.addNewBoard(board);

export const getBoardById = id => boardsRepo.getBoardById(id);

export const updateBoard = (id, updatedBoard) =>
  boardsRepo.updateBoard(id, updatedBoard);

export const deleteBoardById = id => boardsRepo.deleteBoardById(id);


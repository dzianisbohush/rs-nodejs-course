import * as boardsRepo from './board.memory.repository';
import { Board } from './board.model';

export const getAll = () => boardsRepo.getAll();

export const addNewBoard = (board: Partial<Board>) => boardsRepo.addNewBoard(board);

export const getBoardById = (id: string) => boardsRepo.getBoardById(id);

export const updateBoard = (id: string, updatedBoard: Partial<Board>) =>
  boardsRepo.updateBoard(id, updatedBoard);

export const deleteBoardById = (id: string) => boardsRepo.deleteBoardById(id);


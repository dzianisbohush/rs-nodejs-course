import {boardsRepository } from './board.repository';
import { IBoard } from './board.model';

export const getAll = () => boardsRepository.getAll();

export const addNewBoard = (board: Partial<IBoard>) => boardsRepository.addNewBoard(board);

export const getBoardById = (id: string) => boardsRepository.getBoardById(id);

export const updateBoard = (id: string, updatedBoard: Partial<IBoard>) =>
  boardsRepository.updateBoard(id, updatedBoard);

export const deleteBoardById = (id: string) => boardsRepository.deleteBoardById(id);


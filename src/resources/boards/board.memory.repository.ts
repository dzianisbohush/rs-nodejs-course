import { Board } from './board.model';

let BOARDS: Board[] = [];

export const getAll = async (): Promise<Board[]> => BOARDS

export const addNewBoard = async (board: Partial<Board>): Promise<Board> => {

  const createdBoard = new Board(board);

  BOARDS.push(createdBoard);

  return createdBoard;
};

export const getBoardById = async (id: string): Promise<Board | null> => {
  const foundBoard = BOARDS.find(board => board.id === id);

  return foundBoard || null;
};

export const updateBoard = async (id: string, updatedBoardData: Partial<Board>): Promise<Board | null> => {
  let updatedBoard;

  BOARDS = BOARDS.map(board => {
    if (board.id === id) {
      updatedBoard = { ...board, ...updatedBoardData };

      return updatedBoard;
    }

    return board;
  });

  return updatedBoard || null;
};

export const deleteBoardById = async (id: string): Promise<void> => {
  const indexOfBoardForDeleting = BOARDS.findIndex(board => board.id === id);

  if (indexOfBoardForDeleting !== -1) {
    BOARDS.splice(indexOfBoardForDeleting, 1);
  }
};

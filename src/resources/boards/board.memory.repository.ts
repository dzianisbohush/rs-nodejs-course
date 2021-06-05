import { Board } from './board.model';

let BOARDS: Board[] = [];

/**
 * Getting all boards
 *
 * @category Resources / Board
 * @returns {Promise<Array<Board>>} list of boards
 */
export const getAll = async (): Promise<Board[]> => BOARDS

/**
 * Adding new board
 *
 * @category Resources / Board
 * @param {Board} board - new data for board
 * @returns {Promise<Board>} created board
 */
export const addNewBoard = async (board: Partial<Board>): Promise<Board> => {

  const createdBoard = new Board(board);

  BOARDS.push(createdBoard);

  return createdBoard;
};

/**
 * Getting board by id
 *
 * @category Resources / Board
 * @param {string} id - board id
 * @returns {Promise<Board>} found board
 */
export const getBoardById = async (id: string): Promise<Board | null> => {
  const foundBoard = BOARDS.find(board => board.id === id);

  return foundBoard || null;
};

/**
 * Updating board data
 *
 * @category Resources / Board
 * @param {string} id - board id
 * @param updatedBoardData - new data for board
 * @returns {Promise<Board>} updated board data
 */
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

/**
 * Deleting board by id
 *
 * @category Resources / Board
 * @param {string} id - board id
 * @returns {Promise<void>}
 */
export const deleteBoardById = async (id: string): Promise<void> => {
  const indexOfBoardForDeleting = BOARDS.findIndex(board => board.id === id);

  if (indexOfBoardForDeleting !== -1) {
    BOARDS.splice(indexOfBoardForDeleting, 1);
  }
};

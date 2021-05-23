const Board = require('./board.model');

let BOARDS = []

/**
 * Getting all boards
 *
 * @category Resources / Board
 * @returns {Promise<Array<Board>>} list of boards
 */
const getAll = async () => BOARDS

/**
 * Adding new board
 *
 * @category Resources / Board
 * @param {Board} board - new data for board
 * @returns {Promise<Board>} created board
 */
const addNewBoard = async board => {
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
const getBoardById = async id => BOARDS.find(board => board.id === id);

/**
 * Updating board data
 *
 * @category Resources / Board
 * @param {string} id - board id
 * @param updatedBoardData - new data for board
 * @returns {Promise<Board>} updated board data
 */
const updateBoard = async (id, updatedBoardData) => {
  let updatedBoard = null

  BOARDS = BOARDS.map(board => {
    if(board.id === id) {
      updatedBoard = {...board, ...updatedBoardData}

      return updatedBoard
    }

    return board
  })

  return updatedBoard
};

/**
 * Deleting board by id
 *
 * @category Resources / Board
 * @param {string} id - board id
 * @returns {Promise<void>}
 */
const deleteBoardById = async (id) => {
  const indexOfBoardForDeleting = BOARDS.findIndex(board => board.id === id)

  if(indexOfBoardForDeleting !== -1) {
    BOARDS.splice(indexOfBoardForDeleting, 1)
  }
};

module.exports = {
  getAll,
  getBoardById,
  addNewBoard,
  updateBoard,
  deleteBoardById
};

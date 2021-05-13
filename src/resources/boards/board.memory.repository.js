const Board = require('./board.model');
let { BOARDS } = require('./BoardData');

const getAll = async () => BOARDS

const addNewBoard = async board => {
  const createdBoard = new Board(board);

  BOARDS.push(new Board(board));

  return createdBoard;
};

const getBoardById = async id => BOARDS.find(board => board.id === id);


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

const deleteBoardById = async (id) => {
  const indexOfBoardForDeleting = BOARDS.findIndex(board => board.id === id)

  if(indexOfBoardForDeleting) {
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

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
  BOARDS = BOARDS.map(board => {
    if(board.id === id) {
      return {...board, ...updatedBoardData}
    }

    return board
  })

  return BOARDS.find(board => board.id === id)
};

const deleteBoardById = async () => {
  // @todo delete implementation
};

module.exports = {
  getAll,
  getBoardById,
  addNewBoard,
  updateBoard,
  deleteBoardById
};

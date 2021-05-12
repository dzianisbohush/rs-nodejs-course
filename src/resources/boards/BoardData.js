const Board = require('./board.model')
const Column = require('./column.model')

const BOARDS = Array(3).fill(null).map((_, idx) => new Board({
  title: `Board_${idx}`,
  columns: Array(5).fill(null).map((__, innerIdx) => new Column({
    title: `board_${idx}_column_${innerIdx}`, order: innerIdx
  }))
}))

module.exports = {BOARDS}

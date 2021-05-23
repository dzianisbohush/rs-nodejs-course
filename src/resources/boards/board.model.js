const uuid = require('uuid').v4

/**
 * Board class
 *
 * @category Resources / Board
 */
class Board {
  /**
   * Create a board
   *
   * @param {string} id - board id
   * @param {string} title - board title
   * @param {Array<Column>} columns - board columns
   */
  constructor({
                id = uuid(),
                title = 'board title',
                columns = []
              } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  /**
   * Return board data for response
   *
   * @param board
   * @returns {Board}
   */
  static toResponse(board) {
    return board
  }
}

module.exports = Board;

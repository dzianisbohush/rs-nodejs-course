import { v4 } from 'uuid';

/**
 * Board class
 *
 * @category Resources / Board
 */
export class Board {
  /**
   * Create a board
   *
   * @param {string} id - board id
   * @param {string} title - board title
   * @param {Array<Column>} columns - board columns
   */
  constructor({
                id = v4(),
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
    return board;
  }
}

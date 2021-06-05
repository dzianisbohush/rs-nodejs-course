import { v4 } from 'uuid';
import { Column } from './column.model';

/**
 * Board class
 *
 * @category Resources / Board
 */
export class Board {
  id: string = v4();

  title: string;

  columns: Column[];

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
              }: {
    id?: string,
    title?: string,
    columns?: Column[]
  }) {
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
  static toResponse(board: Board): Board {
    return board;
  }
}

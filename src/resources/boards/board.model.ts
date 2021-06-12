import { v4 } from 'uuid';
import { Column } from './column.model';

export class Board {
  id: string = v4();

  title: string;

  columns: Column[];

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

  static toResponse(board: Board): Board {
    return board;
  }
}

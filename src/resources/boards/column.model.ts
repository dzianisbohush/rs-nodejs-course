import { v4 } from 'uuid';

export class Column {
  id: string;

  title: string;

  order: number;

  constructor({ id = v4(), title = 'title of column', order = 0 }: {
    id?: string, title?: string, order?: number
  }) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static toResponse(column: Column): Column {
    return column;
  }
}

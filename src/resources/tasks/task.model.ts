import { v4 } from 'uuid';

export class Task {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string;

  columnId: string;

  constructor({
                id = v4(),
                title = 'TASK title',
                order = 0,
                description = 'task description',
                userId = null,
                boardId = 'board id',
                columnId = 'column id'
              }: {
    id?: string,
    title?: string,
    order?: number,
    description?: string,
    userId?: string | null,
    boardId?: string,
    columnId?: string
  }) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task: Task) {
    return task;
  }
}

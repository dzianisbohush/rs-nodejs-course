import { v4 } from 'uuid';

/**
 * Task class
 *
 * @category Resources / Task
 */
export class Task {
  /**
   * Create a task
   *
   * @param {string} id - task id
   * @param {string} title - title id
   * @param {number} order - task order
   * @param {string} description - task description
   * @param {string} userId - task user id
   * @param {string} boardId - task board id
   * @param {string} columnId - task column id
   */
  constructor({
                id = v4(),
                title = 'TASK title',
                order = 0,
                description = 'task description',
                userId = 'user id',
                boardId = 'board id',
                columnId = 'column id'
              } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  /**
   * Return task data for response
   *
   * @param {Task} task
   * @returns {Task}
   */
  static toResponse(task) {
    return task;
  }
}

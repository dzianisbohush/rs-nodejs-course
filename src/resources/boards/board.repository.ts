import { EntityRepository, Repository, getConnection } from 'typeorm';
import { BoardModel, IBoard } from './board.model';
import { ColumnModel, IColumn } from './column.model';

@EntityRepository(BoardModel)
class BoardsRepository extends Repository<BoardModel> {
  getAll() {
    return this.createQueryBuilder('board')
      .leftJoinAndSelect('board.columns', 'columns')
      .getMany();
  }

  async addNewBoard({ title, columns }: Partial<IBoard>) {
    const board = new BoardModel();

    await this.setNewBoardData(board, title, columns);

    return this.getBoardById(board.id);
  }

  async getBoardById(id: string) {
    return this.createQueryBuilder('board')
      .leftJoinAndSelect('board.columns', 'columns')
      .where('board.id = :id', { id })
      .getOne();
  }


  async updateBoard(id: string, { title, columns }: Partial<IBoard>) {
    await this.deleteColumnsForParticularBoardId(id);

    const exBoard = await this.createQueryBuilder('board')
      .where('board.id = :id', { id })
      .getOne();

    if (exBoard) {
      await this.setNewBoardData(exBoard, title, columns);

      return this.getBoardById(id);
    }

    return null;
  }

  async deleteBoardById(id: string) {
    await this.deleteColumnsForParticularBoardId(id);

    return this.createQueryBuilder()
      .delete()
      .from(BoardModel)
      .where('id = :id', { id })
      .execute();
  }

  async deleteColumnsForParticularBoardId(id: string) {
    const columns = await this.createQueryBuilder()
      .relation(BoardModel, 'columns')
      .of(id)
      .loadMany();

    await Promise.all(columns.map(async ({ id: columnId }) => {
      await this.createQueryBuilder()
        .delete()
        .from(ColumnModel)
        .where('id = :id', { id: columnId })
        .execute();
    }));
  }

  async setNewBoardData(board: BoardModel, title?: string, columns ?: IColumn[]) {
    const connectionManager = getConnection().manager;

    if (board) {
      board.title = title || board.title || '';

      await connectionManager.save(board);

      if (columns) {
        await Promise.all(columns.map(async ({ id: columnId, title: columnTitle, order }) => {
          const column = new ColumnModel();
          column.id = columnId;
          column.title = columnTitle;
          column.order = order;
          column.board = board;
          await connectionManager.save(column);
        }));
      }
    }
  }
}

export const boardsRepository = getConnection().getCustomRepository(BoardsRepository);

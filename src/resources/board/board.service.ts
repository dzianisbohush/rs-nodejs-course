import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { BoardEntity } from './board.entity';
import { ColumnEntity } from './column.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
  ) {}

  getAll() {
    return this.boardRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.columns', 'columns')
      .getMany();
  }

  async setNewBoardData(
    board: BoardEntity,
    title?: string,
    columns?: ColumnEntity[],
  ) {
    const connectionManager = getConnection().manager;

    if (board) {
      board.title = title || board.title || '';

      await connectionManager.save(board);

      if (columns) {
        await Promise.all(
          columns.map(async ({ id: columnId, title: columnTitle, order }) => {
            const column = new ColumnEntity();
            column.id = columnId;
            column.title = columnTitle;
            column.order = order;
            column.board = board;
            await connectionManager.save(column);
          }),
        );
      }
    }
  }

  async addNewBoard({ title, columns }: CreateBoardDto) {
    const board = new BoardEntity();

    await this.setNewBoardData(board, title, columns);

    return this.getBoardById(board.id);
  }

  async getBoardById(id: string) {
    return this.boardRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.columns', 'columns')
      .where('board.id = :id', { id })
      .getOne();
  }

  async updateBoard(id: string, { title, columns }: UpdateBoardDto) {
    await this.deleteColumnsForParticularBoardId(id);

    const exBoard = await this.boardRepository
      .createQueryBuilder('board')
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

    return this.boardRepository
      .createQueryBuilder()
      .delete()
      .from(BoardEntity)
      .where('id = :id', { id })
      .execute();
  }

  async deleteColumnsForParticularBoardId(id: string) {
    const columns = await this.boardRepository
      .createQueryBuilder()
      .relation(BoardEntity, 'columns')
      .of(id)
      .loadMany();

    await Promise.all(
      columns.map(async ({ id: columnId }) => {
        await this.boardRepository
          .createQueryBuilder()
          .delete()
          .from(ColumnEntity)
          .where('id = :id', { id: columnId })
          .execute();
      }),
    );
  }
}

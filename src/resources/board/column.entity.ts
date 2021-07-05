import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BoardEntity, IBoard } from './board.entity';

export interface IColumn {
  id: string;
  title: string;
  order: number;
  board: IBoard;
}

@Entity({ name: 'columns' })
export class ColumnEntity implements IColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, default: '' })
  title: string;

  @Column('integer', { default: 0 })
  order: number;

  @ManyToOne(() => BoardEntity, (board) => board.columns)
  board: BoardEntity;
}

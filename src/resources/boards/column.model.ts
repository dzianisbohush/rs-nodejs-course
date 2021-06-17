import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne
} from 'typeorm';
import { BoardModel, IBoard } from './board.model';

export interface IColumn {
  id: string;
  title: string;
  order: number;
  board: IBoard
}

@Entity({ name: 'columns' })
export class ColumnModel implements IColumn{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, default: '' })
  title: string;

  @Column('integer', { default: 0 })
  order: number;

  @ManyToOne(() => BoardModel, board => board.columns)
  board: BoardModel;
}

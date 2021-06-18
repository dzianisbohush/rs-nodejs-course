import {
  Entity, PrimaryGeneratedColumn, Column, OneToMany
} from 'typeorm';
import { ColumnModel, IColumn } from './column.model';


export interface IBoard {
  id: string,
  title: string,
  columns: IColumn[]
}

@Entity({ name: 'boards' })
export class BoardModel implements IBoard{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, default: '' })
  title: string;

  @OneToMany(() => ColumnModel, column => column.board)
  columns: ColumnModel[];
}

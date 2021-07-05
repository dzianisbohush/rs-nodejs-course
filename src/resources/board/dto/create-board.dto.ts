import { ColumnEntity } from '../column.entity';

export class CreateBoardDto {
  title?: string;
  columns?: ColumnEntity[];
}

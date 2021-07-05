import { ColumnEntity } from '../column.entity';

export class UpdateBoardDto {
  title?: string;
  columns?: ColumnEntity[];
}
